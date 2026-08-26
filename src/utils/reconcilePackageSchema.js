import { proposalAddOnType } from "./proposalPackageRules";

/**
 * Reconciles the hand-authored Contentful `schema` JSON against the structured
 * package data, treating the PAGE PRICE as the single source of truth.
 *
 * Two prices are maintained independently in Contentful:
 *   - `packages[0].price` (Integer) — what the customer sees, and what the
 *     booking form submits.
 *   - a `price` string inside the `schema` JSON blob — what search engines and
 *     AI systems read.
 *
 * Nothing kept them in sync, so they drifted. This restores the invariant at
 * build time and reports every change so drift is visible rather than silently
 * patched.
 *
 * NOT every Offer in the graph is the package. Three kinds must be left alone:
 *
 *   - `addOn[]`            — optional extras, priced from `additions[]` instead.
 *   - `hasOfferCatalog`    — the "what's included" list. Its `itemListElement`
 *     `itemListElement[]`    Offers are inclusions ("Romantic beach decoration")
 *                            and are correctly priceless. Stamping the package
 *                            price on them would advertise every inclusion at
 *                            the full package price.
 *
 * Only offers reached outside those containers describe the package itself.
 */

const CURRENCY = "USD";

/** Containers whose nested Offers are never the package offer. */
const NON_PACKAGE_OFFER_KEYS = new Set([
  "addOn",
  "hasOfferCatalog",
  "itemListElement",
]);

/** Schema prices are strings with two decimals ("1189.00"); page prices are Integers. */
const formatPrice = (value) => Number(value).toFixed(2);

const samePrice = (a, b) =>
  a !== null && a !== undefined && b !== null && b !== undefined
    ? Number(a) === Number(b)
    : false;

const normalizeName = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

/** Plain JSON in, plain JSON out — a round-trip clone is lossless and dependency-free. */
const clone = (value) => JSON.parse(JSON.stringify(value));

/**
 * Exact match on the normalized name, followed only by a verified canonical
 * add-on category match.
 *
 * A containment fallback looks helpful but matches across languages by
 * accident. Canonical categories avoid that problem while still allowing an
 * old schema label such as "Cameraman with drone" to match the verified
 * "Professional video with drone" addition.
 */
const findAddition = (additions, offerName) => {
  const name = normalizeName(offerName);
  if (!name) return null;
  const exact =
    additions.find((a) => normalizeName(a.addition) === name) ?? null;
  if (exact) return exact;

  const offerType = proposalAddOnType(offerName);
  if (!offerType) return null;

  return (
    additions.find(
      (addition) => proposalAddOnType(addition.addition)?.key === offerType.key,
    ) ?? null
  );
};

/**
 * @param {object} schema      Parsed contents of the Contentful `schema` field.
 * @param {object} packageData `packages[0]` — `{ price, additions: [{ addition, price }] }`.
 * @returns {{ schema: object, corrections: Array }}
 */
export const reconcilePackageSchemaPrices = (schema, packageData) => {
  const corrections = [];

  if (!schema || typeof schema !== "object") {
    return { schema, corrections };
  }

  const pagePrice = packageData?.price;

  // No page price means no source of truth — leave the schema exactly as authored.
  if (pagePrice === null || pagePrice === undefined) {
    return { schema, corrections };
  }

  const additions = (
    Array.isArray(packageData?.additions) ? packageData.additions : []
  ).filter((addition) => addition && addition.addition);

  const next = clone(schema);

  const reconcilePackageOffer = (offer, path) => {
    if (offer.price === undefined || offer.price === null) {
      offer.price = formatPrice(pagePrice);
      if (!offer.priceCurrency) offer.priceCurrency = CURRENCY;
      corrections.push({ type: "inserted", path, from: null, to: offer.price });
      return;
    }

    if (!samePrice(offer.price, pagePrice)) {
      const from = offer.price;
      offer.price = formatPrice(pagePrice);
      corrections.push({ type: "corrected", path, from, to: offer.price });
    }
  };

  const unmatchedAddOns = [];
  let matchedAnyAddOn = false;

  const reconcileAddOnOffer = (offer, path) => {
    // No structured add-ons means no source of truth for them — same rule the
    // package price follows.
    if (!additions.length) return;

    const match = findAddition(additions, offer.name);

    if (!match || match.price === null || match.price === undefined) {
      // Collected rather than reported immediately: whether this is worth
      // reporting depends on whether ANY add-on matched. See below.
      unmatchedAddOns.push({
        path,
        name: offer.name ?? null,
        message: match
          ? "matching addition has no price; left unchanged"
          : "add-on has no match in additions[]; left unchanged",
      });
      return;
    }

    matchedAnyAddOn = true;

    if (samePrice(offer.price, match.price)) return;

    const from = offer.price ?? null;
    offer.price = formatPrice(match.price);
    if (!offer.priceCurrency) offer.priceCurrency = CURRENCY;
    corrections.push({
      type: from === null ? "inserted" : "corrected",
      path,
      name: offer.name ?? null,
      from,
      to: offer.price,
    });
  };

  // Walk the whole graph. Node order varies between entries, so never index into it.
  const walk = (node, path, container) => {
    if (Array.isArray(node)) {
      node.forEach((child, index) =>
        walk(child, `${path}[${index}]`, container),
      );
      return;
    }

    if (!node || typeof node !== "object") return;

    if (node["@type"] === "Offer") {
      if (container === "addOn") {
        reconcileAddOnOffer(node, path);
      } else if (!container) {
        reconcilePackageOffer(node, path);
      }
      // Offers inside hasOfferCatalog / itemListElement are inclusions: skipped.
    }

    Object.entries(node).forEach(([key, value]) => {
      walk(
        value,
        `${path}/${key}`,
        NON_PACKAGE_OFFER_KEYS.has(key) ? key : container,
      );
    });
  };

  walk(next, "", null);

  // The Contentful `schema` field is NOT localized, so Spanish pages carry the
  // English schema object while `additions[]` IS localized ("Saxophonist" vs
  // "Saxofonista"). When nothing matched we are comparing across languages —
  // a content-model condition this module cannot resolve, and reporting it on
  // every Spanish page every build would drown out real drift.
  //
  // When SOME add-ons matched, an unmatched one is genuine drift worth naming.
  if (matchedAnyAddOn) {
    unmatchedAddOns.forEach((entry) =>
      corrections.push({ type: "warning", ...entry }),
    );
  }

  return { schema: next, corrections };
};

export default reconcilePackageSchemaPrices;
