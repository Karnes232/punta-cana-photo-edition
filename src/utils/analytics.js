export const GA_MEASUREMENT_ID = "G-QTDC0PBVYX";
export const GOOGLE_ADS_ID = "AW-473253666";
export const CONSENT_STORAGE_KEY = "sertuin_consent_v1";

const PENDING_FORM_KEY = "sertuin_pending_form_v1";
const THANK_YOU_NAME_KEY = "sertuin_thank_you_name";
const AHREFS_SCRIPT_ID = "sertuin-ahrefs-analytics";
const AHREFS_DATA_KEY = "FwoBLKTSAGZTNXoZ73VLUA";
const CAMPAIGN_PARAMETERS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "gclid",
  "dclid",
  "gbraid",
  "wbraid",
]);

const isBrowser = () => typeof window !== "undefined";
const isAdminPath = (pathname = "") =>
  /^\/(?:es\/)?admin(?:\/|$)/i.test(pathname);
const isThankYouPath = (pathname = "") =>
  /^\/(?:es\/)?contact\/thankyou\/?$/i.test(pathname);

const redactSensitiveText = (value) =>
  String(value ?? "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]")
    .replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[redacted]")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, 120);

const safeSlug = (value, fallback = "unknown") => {
  const normalized = redactSensitiveText(value)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
  return normalized || fallback;
};

const safePathname = (value) => {
  try {
    return new URL(value, "https://sertuinevents.com").pathname || "/";
  } catch {
    return "/";
  }
};

const safeReferrer = (value) => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
};

const safePageLocation = (locationLike = window.location) => {
  const url = new URL(locationLike.href || String(locationLike));
  const safeUrl = new URL(`${url.origin}${url.pathname}`);

  url.searchParams.forEach((rawValue, key) => {
    const normalizedKey = key.toLowerCase();
    if (!CAMPAIGN_PARAMETERS.has(normalizedKey)) return;

    const value = redactSensitiveText(rawValue);
    if (!value || value.includes("[redacted]")) return;
    safeUrl.searchParams.set(normalizedKey, value.slice(0, 100));
  });

  return safeUrl.toString();
};

const getPackageSlug = (pathname = "") => {
  const match = pathname.match(/^\/(?:es\/)?packages\/([^/?#]+)/i);
  return match ? safeSlug(decodeURIComponent(match[1])) : undefined;
};

export const getPageContext = (
  pathname = isBrowser() ? window.location.pathname : "/",
) => {
  const cleanPath = safePathname(pathname);
  const language =
    cleanPath === "/es" || cleanPath.startsWith("/es/") ? "es" : "en";
  const packageId = getPackageSlug(cleanPath);
  let pageType = "service";
  let contentGroup = "services";

  if (cleanPath === "/" || cleanPath === "/es/" || cleanPath === "/es") {
    pageType = "home";
    contentGroup = "home";
  } else if (packageId) {
    pageType = "package_detail";
    contentGroup = "proposal_packages";
  } else if (/\/(?:es\/)?proposal\/?$/i.test(cleanPath)) {
    pageType = "proposal_catalog";
    contentGroup = "proposal_packages";
  } else if (/\/(?:es\/)?blog(?:\/|$)/i.test(cleanPath)) {
    pageType =
      cleanPath.split("/").filter(Boolean).length > (language === "es" ? 2 : 1)
        ? "article"
        : "blog_index";
    contentGroup = "blog";
  } else if (/\/(?:es\/)?contact\/thankyou\/?$/i.test(cleanPath)) {
    pageType = "form_confirmation";
    contentGroup = "lead_generation";
  } else if (/\/(?:es\/)?contact\/?$/i.test(cleanPath)) {
    pageType = "contact";
    contentGroup = "lead_generation";
  } else if (/\/(?:es\/)?privacy\/?$/i.test(cleanPath)) {
    pageType = "privacy";
    contentGroup = "legal";
  } else if (cleanPath === "/404/" || cleanPath === "/404.html") {
    pageType = "not_found";
    contentGroup = "errors";
  }

  return {
    language,
    page_type: pageType,
    content_group: contentGroup,
    ...(packageId ? { package_id: packageId } : {}),
  };
};

const normalizeParameter = (value) => {
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (value == null) return undefined;
  return redactSensitiveText(value);
};

export const trackEvent = (eventName, parameters = {}) => {
  if (!isBrowser() || isAdminPath(window.location.pathname)) return false;
  if (typeof window.gtag !== "function") return false;

  const safeEventName = safeSlug(eventName, "site_interaction").slice(0, 40);
  const safeParameters = {};
  Object.entries({
    ...getPageContext(window.location.pathname),
    ...parameters,
  }).forEach(([key, value]) => {
    const safeKey = safeSlug(key).slice(0, 40);
    const safeValue = normalizeParameter(value);
    if (safeValue !== undefined && safeValue !== "") {
      safeParameters[safeKey] = safeValue;
    }
  });

  window.gtag("event", safeEventName, {
    ...safeParameters,
    send_to: GA_MEASUREMENT_ID,
  });
  return true;
};

export const getStoredConsentLevel = () => {
  if (!isBrowser()) return null;
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY));
    return ["all", "analytics", "necessary"].includes(stored?.level)
      ? stored.level
      : null;
  } catch {
    return null;
  }
};

const consentStateFor = (level) => ({
  analytics_storage:
    level === "all" || level === "analytics" ? "granted" : "denied",
  ad_storage: level === "all" ? "granted" : "denied",
  ad_user_data: level === "all" ? "granted" : "denied",
  ad_personalization: level === "all" ? "granted" : "denied",
  functionality_storage: "granted",
  security_storage: "granted",
});

const deleteAnalyticsCookies = () => {
  if (!isBrowser()) return;
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!/^(_ga|_gid|_gat|_gcl|_gac)/i.test(name || "")) return;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.sertuinevents.com; SameSite=Lax`;
  });
};

export const loadAhrefsAnalytics = () => {
  if (!isBrowser() || document.getElementById(AHREFS_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = AHREFS_SCRIPT_ID;
  script.src = "https://analytics.ahrefs.com/analytics.js";
  script.dataset.key = AHREFS_DATA_KEY;
  script.async = true;
  document.head.appendChild(script);
};

export const applyConsentLevel = (level) => {
  if (!isBrowser() || !["all", "analytics", "necessary"].includes(level)) {
    return;
  }

  const previousLevel = getStoredConsentLevel();
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ level, updatedAt: new Date().toISOString() }),
  );

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consentStateFor(level));
  }
  if (level === "all" || level === "analytics") {
    window.__sertuinLoadGoogleTag?.();
    loadAhrefsAnalytics();
  } else {
    deleteAnalyticsCookies();
  }

  const optionalScriptsLoaded = Boolean(
    document.getElementById(AHREFS_SCRIPT_ID) ||
      document.querySelector('script[data-sertuin-google-tag="true"]'),
  );

  // Optional scripts cannot be unloaded reliably. Reloading after revocation
  // guarantees that "necessary only" takes effect immediately.
  if (level === "necessary" && optionalScriptsLoaded) {
    window.location.reload();
    return;
  }

  if (previousLevel !== level) {
    trackEvent("consent_update", { consent_level: level });
  }
};

export const storeThankYouName = (name) => {
  if (!isBrowser()) return;
  const safeName = String(name ?? "")
    .trim()
    .slice(0, 80);
  if (safeName) sessionStorage.setItem(THANK_YOU_NAME_KEY, safeName);
};

export const consumeThankYouName = () => {
  if (!isBrowser()) return "";
  const name = sessionStorage.getItem(THANK_YOU_NAME_KEY) || "";
  sessionStorage.removeItem(THANK_YOU_NAME_KEY);
  return name;
};

const publicFormName = (form) => {
  const name = form?.getAttribute?.("name") || form?.id || "website-form";
  return safeSlug(name, "website_form");
};

const numericFormValue = (form, fieldName) => {
  const value = Number(form?.elements?.namedItem?.(fieldName)?.value);
  return Number.isFinite(value) && value >= 0 ? value : undefined;
};

const getFormContext = (form) => {
  const pathname = isBrowser() ? window.location.pathname : "/";
  const packageId = getPackageSlug(pathname);
  const total = numericFormValue(form, "estimated-total");
  return {
    form_name: publicFormName(form),
    form_destination: "netlify_forms",
    source_page: safePathname(pathname),
    ...(packageId ? { package_id: packageId } : {}),
    ...(total !== undefined ? { value: total, currency: "USD" } : {}),
  };
};

const savePendingForm = (form) => {
  if (!isBrowser()) return;
  const context = getFormContext(form);
  try {
    sessionStorage.setItem(
      PENDING_FORM_KEY,
      JSON.stringify({ ...context, created_at: Date.now() }),
    );
  } catch {
    // A blocked sessionStorage must never prevent a form submission.
  }
};

const clearPendingForm = () => {
  if (!isBrowser()) return;
  sessionStorage.removeItem(PENDING_FORM_KEY);
};

const emitFormSuccess = (context) => {
  const eventName =
    context.form_name === "testimonial" ? "testimonial_submit" : "form_submit";
  trackEvent(eventName, context);
  if (context.form_name !== "testimonial") {
    trackEvent("generate_lead", context);
  }
};

export const trackFormSuccess = (form) => {
  const context = getFormContext(form);
  emitFormSuccess(context);
  clearPendingForm();
};

export const trackFormError = (form, reason = "submission_error") => {
  trackEvent("form_error", {
    ...getFormContext(form),
    error_type: safeSlug(reason),
  });
  clearPendingForm();
};

const consumePendingFormSuccess = () => {
  if (!isBrowser()) return;
  let pending;
  try {
    pending = JSON.parse(sessionStorage.getItem(PENDING_FORM_KEY));
  } catch {
    pending = null;
  }
  clearPendingForm();
  if (
    !pending ||
    Date.now() - Number(pending.created_at || 0) > 60 * 60 * 1000
  ) {
    return;
  }
  const { created_at: _createdAt, ...context } = pending;
  emitFormSuccess(context);
};

let initialized = false;
let sectionObserver;
let seenSections = new Set();
let seenScrollDepths = new Set();
let startedForms = new WeakSet();
let currentPage = null;
let engagementTimer;

const activeMilliseconds = () => {
  if (!currentPage) return 0;
  const running = currentPage.activeSince
    ? performance.now() - currentPage.activeSince
    : 0;
  return currentPage.accumulated + running;
};

const pauseEngagement = () => {
  if (!currentPage?.activeSince) return;
  currentPage.accumulated += performance.now() - currentPage.activeSince;
  currentPage.activeSince = null;
};

const resumeEngagement = () => {
  if (!currentPage || currentPage.activeSince || document.hidden) return;
  currentPage.activeSince = performance.now();
};

const reportEngagement = (reason) => {
  if (!currentPage) return;
  const activeMs = Math.round(activeMilliseconds());
  const delta = activeMs - currentPage.lastReported;
  if (delta < 1000) return;
  currentPage.lastReported = activeMs;
  trackEvent("page_engagement", {
    page_path: currentPage.path,
    engagement_time_msec: delta,
    engagement_reason: reason,
    max_scroll_percent: Math.round(currentPage.maxScroll),
  });
};

const observeSections = () => {
  sectionObserver?.disconnect();
  seenSections = new Set();
  if (!("IntersectionObserver" in window)) return;

  const sections = Array.from(
    document.querySelectorAll("main section, main [data-analytics-section]"),
  ).slice(0, 50);
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
        const element = entry.target;
        const heading = element.querySelector("h1, h2, h3")?.textContent;
        const label = safeSlug(
          element.dataset.analyticsSection || element.id || heading,
          `section_${sections.indexOf(element) + 1}`,
        );
        if (seenSections.has(label)) return;
        seenSections.add(label);
        trackEvent("section_view", { section_name: label });
        sectionObserver.unobserve(element);
      });
    },
    { threshold: [0.35] },
  );
  sections.forEach((section) => sectionObserver.observe(section));
};

const updateScrollDepth = () => {
  if (!currentPage) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const depth =
    scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 100;
  currentPage.maxScroll = Math.max(currentPage.maxScroll, depth);
  [25, 50, 75, 90].forEach((threshold) => {
    if (depth < threshold || seenScrollDepths.has(threshold)) return;
    seenScrollDepths.add(threshold);
    trackEvent("scroll_depth", { percent_scrolled: threshold });
  });
};

const trackLinkClick = (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link) return;
  const rawHref = link.getAttribute("href") || "";
  const label = redactSensitiveText(
    link.getAttribute("aria-label") || link.textContent,
  );

  if (/^tel:/i.test(rawHref)) {
    trackEvent("contact_click", { contact_method: "phone", link_label: label });
    return;
  }
  if (/^mailto:/i.test(rawHref)) {
    trackEvent("contact_click", { contact_method: "email", link_label: label });
    return;
  }

  let url;
  try {
    url = new URL(rawHref, window.location.href);
  } catch {
    return;
  }

  if (/wa\.me|whatsapp\.com/i.test(url.hostname)) {
    trackEvent("contact_click", {
      contact_method: "whatsapp",
      link_label: label,
    });
    return;
  }
  if (/m\.me|messenger\.com/i.test(url.hostname)) {
    trackEvent("contact_click", {
      contact_method: "messenger",
      link_label: label,
    });
    return;
  }

  const cleanTarget = `${url.origin}${url.pathname}`;
  if (/\.(pdf|docx?|xlsx?|csv|zip|jpe?g|png|webp)$/i.test(url.pathname)) {
    trackEvent("file_download", { file_path: url.pathname, link_label: label });
  } else if (url.origin !== window.location.origin) {
    trackEvent("outbound_click", {
      link_domain: url.hostname,
      link_label: label,
    });
  } else {
    const packageId = getPackageSlug(url.pathname);
    if (packageId && packageId !== getPackageSlug(window.location.pathname)) {
      trackEvent("select_item", {
        item_id: packageId,
        item_name: packageId,
        item_list_name: getPageContext().content_group,
      });
    }
    trackEvent("navigation_click", {
      link_path: safePathname(cleanTarget),
      link_label: label,
    });
  }
};

const initializeWebVitals = () => {
  import("web-vitals")
    .then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const report = ({ name, value, delta, rating, id, navigationType }) => {
        trackEvent("web_vital", {
          metric_name: name,
          metric_value: Number(value.toFixed(name === "CLS" ? 4 : 0)),
          metric_delta: Number(delta.toFixed(name === "CLS" ? 4 : 0)),
          metric_rating: rating,
          metric_id: id,
          navigation_type: navigationType,
        });
      };
      [onCLS, onFCP, onINP, onLCP, onTTFB].forEach((register) =>
        register(report),
      );
    })
    .catch(() => {
      // Performance telemetry is optional and must never affect the website.
    });
};

export const initializeAnalyticsTracking = () => {
  if (!isBrowser() || initialized) return;
  initialized = true;

  const consent = getStoredConsentLevel();
  if (consent === "all" || consent === "analytics") loadAhrefsAnalytics();

  document.addEventListener("click", trackLinkClick, true);
  document.addEventListener(
    "focusin",
    (event) => {
      const form = event.target.closest?.("form");
      if (
        !form ||
        isAdminPath(window.location.pathname) ||
        startedForms.has(form)
      )
        return;
      startedForms.add(form);
      trackEvent("form_start", getFormContext(form));
    },
    true,
  );
  document.addEventListener(
    "invalid",
    (event) => {
      const form = event.target.form;
      if (!form || isAdminPath(window.location.pathname)) return;
      trackEvent("form_validation_error", {
        ...getFormContext(form),
        field_name: safeSlug(
          event.target.name || event.target.id || "unknown_field",
        ),
        validation_type: event.target.validity?.valueMissing
          ? "required"
          : "invalid",
      });
    },
    true,
  );
  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (
        !(form instanceof HTMLFormElement) ||
        isAdminPath(window.location.pathname)
      )
        return;
      const context = getFormContext(form);
      savePendingForm(form);
      trackEvent("form_submit_attempt", context);
    },
    true,
  );
  window.addEventListener("scroll", updateScrollDepth, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseEngagement();
      reportEngagement("page_hidden");
    } else {
      resumeEngagement();
    }
  });
  window.addEventListener("pagehide", () => {
    pauseEngagement();
    reportEngagement("page_exit");
  });
  window.addEventListener("error", (event) => {
    trackEvent("exception", {
      description: redactSensitiveText(event.message || "javascript_error"),
      error_source: safePathname(event.filename || "/"),
      fatal: false,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    trackEvent("exception", {
      description: redactSensitiveText(
        event.reason?.message || "unhandled_promise_rejection",
      ),
      error_source: "promise",
      fatal: false,
    });
  });

  engagementTimer = window.setInterval(() => {
    if (!currentPage || document.hidden) return;
    const seconds = Math.floor(activeMilliseconds() / 1000);
    [15, 30, 60, 120, 300].forEach((threshold) => {
      if (seconds < threshold || currentPage.checkpoints.has(threshold)) return;
      currentPage.checkpoints.add(threshold);
      trackEvent("engagement_checkpoint", { active_seconds: threshold });
    });
  }, 5000);

  initializeWebVitals();
};

export const trackRouteUpdate = (locationLike = window.location) => {
  if (!isBrowser()) return;
  initializeAnalyticsTracking();

  if (currentPage) {
    pauseEngagement();
    reportEngagement("route_change");
  }

  const pathname = safePathname(
    locationLike.pathname || window.location.pathname,
  );
  sectionObserver?.disconnect();
  seenScrollDepths = new Set();
  startedForms = new WeakSet();
  currentPage = {
    path: pathname,
    accumulated: 0,
    activeSince: document.hidden ? null : performance.now(),
    lastReported: 0,
    maxScroll: 0,
    checkpoints: new Set(),
  };

  if (isAdminPath(pathname)) return;

  trackEvent("page_view", {
    page_title: document.title,
    page_location: safePageLocation(window.location),
    page_path: pathname,
    page_referrer: safeReferrer(document.referrer),
  });

  const packageId = getPackageSlug(pathname);
  if (packageId) {
    trackEvent("view_item", {
      item_id: packageId,
      item_name: packageId,
      item_category: "marriage_proposal_package",
    });
  }
  if (isThankYouPath(pathname)) consumePendingFormSuccess();

  window.requestAnimationFrame(() => {
    updateScrollDepth();
    observeSections();
  });
};
