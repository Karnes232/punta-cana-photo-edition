/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();

const { publishedBlogSlugs } = require("./src/data/publishedBlogSlugs");
const { retiredPackageSlugs } = require("./src/data/retiredPackageSlugs");

const publicCrawlers = [
  "*",
  "Googlebot",
  "Google-Extended",
  "bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "meta-externalagent",
  "meta-externalfetcher",
];
const privatePaths = [
  "/admin",
  "/admin/*",
  "/es/admin",
  "/es/admin/*",
  "/pt/admin",
  "/pt/admin/*",
  "/**/admin",
  "/**/admin/*",
];
const retiredPublicPaths = [
  "/punta-cana-bachelor-party/",
  "/weddings-punta-cana/",
  "/photo-gallery/",
  "/event-rentals/",
  "/event-rentals/cart/",
  "/birthday-celebrations/",
  "/floral-art/",
];
const nonIndexablePaths = [
  "/404/",
  "/404.html",
  "/dev-404-page/",
  "/contact/thankyou/",
  "/share-your-experience/",
];

// These dates are changed only when the corresponding page receives a
// meaningful content or SEO update. Unlike a build timestamp, they remain an
// honest last-modified signal on later no-op deploys.
const seoLastModified = new Map(
  [
    "/",
    "/gender-reveal-punta-cana/",
    "/puntacana-wedding-planner/",
    "/punta-cana-elopement-packages/",
  ].flatMap((pagePath) =>
    ["", "/es", "/pt"].map((prefix) => [
      pagePath === "/" ? `${prefix}/` || "/" : `${prefix}${pagePath}`,
      prefix === "/pt" ? "2026-08-30" : "2026-08-29",
    ]),
  ),
);

// Sitemap defence in depth: page creation already blocks these routes, but the
// sitemap must also remain clean if another plugin or future template creates
// one accidentally.
const isRetiredOrUnapprovedContentPath = (value) => {
  const normalized = `/${String(value || "")}`.replace(/\/{2,}/g, "/");
  const blogMatch = normalized.match(/^\/(?:(?:es|pt)\/)?blog\/([^/]+)\/?$/);
  if (blogMatch && !publishedBlogSlugs.has(blogMatch[1].toLowerCase())) {
    return true;
  }

  const packageMatch = normalized.match(
    /^\/(?:(?:es|pt)\/)?packages\/([^/]+)\/?$/,
  );
  return Boolean(
    packageMatch && retiredPackageSlugs.has(packageMatch[1].toLowerCase()),
  );
};

module.exports = {
  siteMetadata: {
    title: `Sertuin Events`,
    siteUrl: `https://sertuinevents.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        localeFilter: (locale) => true,
        // downloadLocal: true,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    // react-pro-sidebar (the navbar menu) styles itself with emotion. Without
    // emotion's SSR extraction the server-injected <style> blocks do not match
    // what the client regenerates, which broke hydration site-wide: seven
    // React #418 errors plus a #423 that dropped the whole root back to client
    // rendering.
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.filter(
            (page) =>
              !page.path.includes("admin") &&
              !isRetiredOrUnapprovedContentPath(page.path) &&
              !nonIndexablePaths.some(
                (privatePath) =>
                  page.path === privatePath ||
                  page.path === `/es${privatePath}` ||
                  page.path === `/pt${privatePath}`,
              ) &&
              !retiredPublicPaths.some(
                (retiredPath) =>
                  page.path === retiredPath ||
                  page.path === `/es${retiredPath}` ||
                  page.path === `/pt${retiredPath}`,
              ),
          );
        },
        serialize: (page) => {
          return {
            url: page.path,
            ...(seoLastModified.has(page.path)
              ? { lastmod: seoLastModified.get(page.path) }
              : {}),
          };
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://sertuinevents.com",
        sitemap: "https://sertuinevents.com/sitemap-index.xml",
        policy: publicCrawlers.map((userAgent) => ({
          userAgent,
          allow: "/",
          disallow: privatePaths,
        })),
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Sertuin Events",
        short_name: `Sertuin Events`,
        start_url: `/`,
        icon: "src/images/favicon.png",
      },
    },
    // Fonts are self-hosted via @fontsource-variable, imported in
    // gatsby-browser.js. gatsby-omni-font-loader used to live here but emitted
    // plain render-blocking <link rel="stylesheet"> tags to fonts.googleapis.com.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          // Google Analytics / GA
          "G-1JE4933FBR",
          "AW-473253666", // Google Ads / Adwords / AW
          // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: `locale`,
        languages: ["en-US", "es", "pt"],
        defaultLanguage: "en-US",
        // Keep every language tied to its explicit URL. Automatic browser-
        // language redirects can turn an English URL into /es/ after a visitor
        // has selected Spanish, which muddies language signals and makes shared
        // search-result links behave inconsistently.
        redirect: false,
        siteUrl: "https://sertuinevents.com/",
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang?/blog",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/blog/:uid",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/packages/:uid",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/proposal",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/punta-cana-elopement-packages",
            getLanguageFromPath: true,
          },

          {
            matchPath: "/:lang?/wedding",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/puntacana-wedding-planner",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/event-planner",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/gender-reveal-punta-cana",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/contact",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/admin",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/",
            getLanguageFromPath: true,
          },
        ],
      },
    },
  ],
  flags: {
    DEV_SSR: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
};
