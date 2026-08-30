const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");
const {
  groups: retiredBlogRedirectGroups,
  categoryRedirects: retiredBlogCategoryRedirects,
} = require("./src/data/retiredBlogRedirects");
const { isPublishedBlogSlug } = require("./src/data/publishedBlogSlugs");
const { retiredPackageSlugs } = require("./src/data/retiredPackageSlugs");

const retiredStaticPaths = new Set([
  "/wedding",
  "/es/wedding",
  "/photo-gallery",
  "/es/photo-gallery",
  "/event-rentals",
  "/es/event-rentals",
  "/event-rentals/cart",
  "/es/event-rentals/cart",
  "/birthday-celebrations",
  "/es/birthday-celebrations",
  "/floral-art",
  "/es/floral-art",
]);

exports.onCreatePage = ({ page, actions }) => {
  const normalizedPath = page.path.replace(/\/+$/, "") || "/";
  if (retiredStaticPaths.has(normalizedPath)) {
    actions.deletePage(page);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ContentfulPackagePageContent implements Node {
      videoUrl: String
    }

    type ContentfulBlogPost implements Node {
      directAnswer: contentfulBlogPostDirectAnswerTextNode @link(from: "directAnswer___NODE")
      primaryCtaTitle: String
      primaryCtaText: contentfulBlogPostPrimaryCtaTextTextNode @link(from: "primaryCtaText___NODE")
      primaryCtaButtonText: String
      primaryCtaButtonUrl: String
      galleryImages: [ContentfulBlogGalleryImage] @link(from: "galleryImages___NODE")
      articleContent: ContentfulBlogPostArticleContent
      socialEmbeds: [ContentfulBlogSocialEmbed] @link(from: "socialEmbeds___NODE")
      helpTitle: String
      helpText: contentfulBlogPostHelpTextTextNode @link(from: "helpText___NODE")
      helpWhatsAppEnabled: Boolean
      helpWhatsAppUrl: String
      helpEmailEnabled: Boolean
      helpEmailAddress: String
      helpCustomLinkEnabled: Boolean
      helpCustomLinkText: String
      helpCustomLinkUrl: String
    }

    type contentfulBlogPostDirectAnswerTextNode implements Node {
      directAnswer: String
    }

    type contentfulBlogPostPrimaryCtaTextTextNode implements Node {
      primaryCtaText: String
    }

    type contentfulBlogPostHelpTextTextNode implements Node {
      helpText: String
    }

    type ContentfulBlogPostArticleContent {
      raw: String
      references: [ContentfulReference] @link(from: "references___NODE")
    }

    type ContentfulBlogGalleryImage implements Node {
      image: ContentfulAsset @link(from: "image___NODE")
      altText: String
      caption: String
    }

    type ContentfulBlogSocialEmbed implements Node {
      platform: String
      url: String
    }

    # Optional fields on this type are inferred from entry data, so the schema
    # loses a field the moment no entry populates it — which breaks any query
    # selecting it. Only two entries remain (Index and Gender Reveal), so
    # declare the optional scalars explicitly rather than depend on inference.
    type ContentfulCardWithImage implements Node {
      secondaryTitle: String
      paragraph: String
      paragraph2: String
      buttonText: String
      linkUrl: String
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const queryResults = await graphql(`
    query MyQuery {
      allContentfulGeneralLayout {
        nodes {
          node_locale
          companyName
          facebook
          instagram
          x
          telephone
          messengerLink
        }
      }
      allContentfulPackagePageContent {
        nodes {
          id
          urlSlug
          node_locale
        }
      }
      allContentfulBlogPost {
        nodes {
          slug
          id
          node_locale
        }
      }
    }
  `);
  const localeMapping = {
    "en-US": { path: "", urlCode: "en-US", contentLanguage: "en-US" },
    es: { path: "es", urlCode: "es", contentLanguage: "es" },
    pt: { path: "pt", urlCode: "pt", contentLanguage: "en-US" },
  };

  const packageTemplate = path.resolve(`src/template/package.js`);
  const blogTemplate = path.resolve(`src/template/blog.js`);
  const generalLayouts = queryResults.data.allContentfulGeneralLayout.nodes;
  const layoutFor = (language) =>
    generalLayouts.find((node) => node.node_locale === language) ||
    generalLayouts.find((node) => node.node_locale === "en-US") ||
    generalLayouts[0];

  queryResults.data.allContentfulBlogPost.nodes.forEach((node) => {
    const slug = node.slug?.trim();
    if (!slug || !isPublishedBlogSlug(slug)) return;

    // Get language code for URL from the Contentful locale
    const lang = node.node_locale === "en-US" ? "" : node.node_locale;
    const langPrefix = lang ? `/${lang}` : "";
    createPage({
      path: `${langPrefix}/blog/${slug}`,
      component: blogTemplate,
      context: {
        id: node.id,
        language: node.node_locale, // Pass the language to the template
        contentLanguage: node.node_locale,
        blog: node,
        layout: layoutFor(node.node_locale),
      },
      // defer: true,
    });

    if (node.node_locale === "en-US") {
      createPage({
        path: `/pt/blog/${slug}`,
        component: blogTemplate,
        context: {
          id: node.id,
          language: "pt",
          contentLanguage: "en-US",
          blog: node,
          layout: layoutFor("en-US"),
        },
      });
    }
  });

  queryResults.data.allContentfulPackagePageContent.nodes.forEach((node) => {
    if (retiredPackageSlugs.has(node.urlSlug?.trim())) return;

    // Get language code for URL from the Contentful locale
    const lang = node.node_locale === "en-US" ? "" : node.node_locale;
    const langPrefix = lang ? `/${lang}` : "";
    createPage({
      path: `${langPrefix}/packages/${node.urlSlug?.trim()}`,
      component: packageTemplate,
      context: {
        id: node.id,
        language: node.node_locale,
        contentLanguage: node.node_locale,
        layout: layoutFor(node.node_locale),
        package: node,
      },
    });

    if (node.node_locale === "en-US") {
      createPage({
        path: `/pt/packages/${node.urlSlug?.trim()}`,
        component: packageTemplate,
        context: {
          id: node.id,
          language: "pt",
          contentLanguage: "en-US",
          layout: layoutFor("en-US"),
          package: node,
        },
      });
    }
  });

  try {
    const { data } = await graphql(`
      query {
        allContentfulGeneralLayout {
          nodes {
            favIcon {
              url
            }
          }
        }
      }
    `);

    const faviconUrl = data?.allContentfulGeneralLayout?.nodes[0]?.favIcon?.url;
    if (faviconUrl) {
      const response = await fetch(`${faviconUrl}`);
      const buffer = await response.buffer();

      const dir = "src/images";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Only rewrite when the favicon actually changed. Rewriting this source
      // file every build invalidates the manifest/sharp/source caches that
      // Netlify persists, which is the main build-speed regression.
      const filePath = path.join(dir, "favicon.png");
      const unchanged =
        fs.existsSync(filePath) && fs.readFileSync(filePath).equals(buffer);
      if (unchanged) {
        reporter.info(
          "Favicon unchanged — skipping write to preserve build cache",
        );
      } else {
        fs.writeFileSync(filePath, buffer);
        reporter.success("Successfully downloaded favicon from Contentful");
      }
    }
  } catch (error) {
    reporter.error("Error downloading favicon:", error);
  }

  Object.entries(localeMapping).forEach(
    ([pageLanguage, { path: urlPath, urlCode, contentLanguage }]) => {
      // Create index page
      const indexPath = urlPath === "" ? "/" : `/${urlPath}`;
      createPage({
        path: indexPath,
        component: path.resolve("./src/pages/index.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      if (pageLanguage !== "pt") {
        const adminPath = urlPath === "" ? "/admin" : `/${urlPath}/admin`;
        createPage({
          path: adminPath,
          component: path.resolve("./src/pages/admin/index.js"),
          context: {
            language: pageLanguage,
            contentLanguage,
            urlLanguage: urlCode,
          },
        });
      }

      const contactPath = urlPath === "" ? "/contact" : `/${urlPath}/contact`;
      createPage({
        path: contactPath,
        component: path.resolve("./src/pages/contact/index.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const thankYouPath = `${contactPath}/thankyou`;
      createPage({
        path: thankYouPath,
        component: path.resolve("./src/pages/contact/thankyou.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const proposalPath =
        urlPath === "" ? "/proposal" : `/${urlPath}/proposal`;
      createPage({
        path: proposalPath,
        component: path.resolve("./src/pages/proposal/index.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const elopementPath =
        urlPath === ""
          ? "/punta-cana-elopement-packages"
          : `/${urlPath}/punta-cana-elopement-packages`;
      createPage({
        path: elopementPath,
        component: path.resolve(
          "./src/pages/punta-cana-elopement-packages/index.js",
        ),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const weddingPlannerPath =
        urlPath === ""
          ? "/puntacana-wedding-planner"
          : `/${urlPath}/puntacana-wedding-planner`;
      createPage({
        path: weddingPlannerPath,
        component: path.resolve(
          "./src/pages/puntacana-wedding-planner/index.js",
        ),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const eventPlannerPath =
        urlPath === "" ? "/event-planner" : `/${urlPath}/event-planner`;
      createPage({
        path: eventPlannerPath,
        component: path.resolve("./src/pages/event-planner/index.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const genderRevealPath =
        urlPath === ""
          ? "/gender-reveal-punta-cana"
          : `/${urlPath}/gender-reveal-punta-cana`;
      createPage({
        path: genderRevealPath,
        component: path.resolve(
          "./src/pages/gender-reveal-punta-cana/index.js",
        ),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      const blogPath = urlPath === "" ? "/blog" : `/${urlPath}/blog`;
      createPage({
        path: blogPath,
        component: path.resolve("./src/pages/blog/index.js"),
        context: {
          language: pageLanguage,
          contentLanguage,
          urlLanguage: urlCode,
        },
      });

      // You can add code here to create other pages (blog, about, etc.)
      // following the same pattern
    },
  );

  // --- Client-editable 301 redirects (Contentful "Redirect" content type) ---
  // Queried separately from MyQuery so that if the "Redirect" content type does
  // not exist yet in Contentful (or the query fails), it degrades gracefully
  // instead of breaking the entire page build.
  const { createRedirect } = actions;
  const protectedRedirectSources = new Set();

  const createPermanentRedirect = (fromPath, toPath) => {
    const normalizedFrom = fromPath.replace(/\/+$/, "");
    [normalizedFrom, `${normalizedFrom}/`].forEach((source) => {
      protectedRedirectSources.add(source);
      createRedirect({
        fromPath: source,
        toPath,
        statusCode: 301,
        force: true,
        isPermanent: true,
      });
    });
  };

  createPermanentRedirect(
    "/gender-reveal-and-baby-showers",
    "/gender-reveal-punta-cana/",
  );
  createPermanentRedirect(
    "/es/gender-reveal-and-baby-showers",
    "/es/gender-reveal-punta-cana/",
  );

  // Map only deleted URLs whose intent is fully served by a current page.
  // Both language variants are emitted. All other deleted posts return a real
  // 404, which follows Google's guidance and avoids soft-404 redirects.
  retiredBlogRedirectGroups.forEach(({ slugs, destination }) => {
    slugs.forEach((slug) => {
      createPermanentRedirect(`/blog/${slug}`, destination);
      createPermanentRedirect(`/es/blog/${slug}`, `/es${destination}`);
    });
  });

  // Old category pages were removed with the previous blog library. They are
  // redirected selectively here when a real replacement exists; empty/thin
  // category pages are not rebuilt.
  Object.entries(retiredBlogCategoryRedirects).forEach(
    ([source, destination]) => {
      createPermanentRedirect(source, destination);
      createPermanentRedirect(`/es${source}`, `/es${destination}`);
    },
  );

  const permanentElopementRedirects = [
    {
      from: "/elopement-vow-renewal",
      to: "/punta-cana-elopement-packages/",
    },
    {
      from: "/es/elopement-vow-renewal",
      to: "/es/punta-cana-elopement-packages/",
    },
  ];

  permanentElopementRedirects.forEach(({ from, to }) => {
    createPermanentRedirect(from, to);
  });

  const redirectResults = await graphql(`
    query RedirectsQuery {
      allContentfulRedirect {
        nodes {
          from
          to
        }
      }
    }
  `);

  if (redirectResults.errors) {
    reporter.warn(
      `[redirects] Skipping redirects — GraphQL query failed (is the "Redirect" content type created in Contentful?): ${redirectResults.errors}`,
    );
  } else {
    const rawNodes = redirectResults.data?.allContentfulRedirect?.nodes || [];

    const seen = new Set();
    let created = 0;
    let skipped = 0;

    for (const node of rawNodes) {
      const from = typeof node.from === "string" ? node.from.trim() : "";
      const to = typeof node.to === "string" ? node.to.trim() : "";

      // Skip malformed entries rather than crashing the build.
      if (!from || !to) {
        reporter.warn(
          `[redirects] Skipping malformed entry (missing from/to): from=${JSON.stringify(
            node.from,
          )} to=${JSON.stringify(node.to)}`,
        );
        skipped++;
        continue;
      }

      // Dedupe: localeFilter yields one node per locale → duplicate pairs.
      if (seen.has(from)) continue;
      seen.add(from);

      // trailingSlash defaults to "always": emit BOTH slash variants of the
      // source so the old URL redirects whether or not it was indexed with a
      // trailing slash.
      const noSlash = from.replace(/\/+$/, "");
      const withSlash = `${noSlash}/`;
      const fromVariants = noSlash === "" ? [from] : [noSlash, withSlash];

      // Source-controlled migrations are reviewed and language-safe. A stale
      // Contentful entry must not override one of them (this previously sent a
      // Spanish proposal article to the English proposal page).
      if (fromVariants.some((source) => protectedRedirectSources.has(source))) {
        reporter.warn(
          `[redirects] Skipping Contentful override for protected source ${from}`,
        );
        skipped++;
        continue;
      }

      // Normalize an internal destination to a trailing slash (matches
      // trailingSlash: "always") to avoid a redirect chain. Leave external
      // URLs and paths with a query/hash/extension as-is.
      let toPath = to;
      const isInternal = to.startsWith("/") && !to.startsWith("//");
      const hasQueryOrHash = /[?#]/.test(to);
      const looksLikeFile = /\.[a-z0-9]+$/i.test(to.split(/[?#]/)[0]);
      if (
        isInternal &&
        !hasQueryOrHash &&
        !looksLikeFile &&
        !to.endsWith("/")
      ) {
        toPath = `${to}/`;
      }

      for (const fromPath of fromVariants) {
        createRedirect({
          fromPath,
          toPath,
          statusCode: 301,
          force: true,
          isPermanent: true,
        });
        created++;
      }
    }

    reporter.info(
      `[redirects] Created ${created} redirect rule(s) from ${seen.size} Contentful entr${
        seen.size === 1 ? "y" : "ies"
      } (${skipped} skipped).`,
    );
  }
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  const config = {
    resolve: {
      fallback: {
        fs: false,
        path: false,
        stream: false,
      },
    },
  };

  if (stage === "build-html" || stage === "build-javascript") {
    config.devtool = false; // Disable .map files to avoid Netlify DSG/SSR crash
  }

  actions.setWebpackConfig(config);
};
