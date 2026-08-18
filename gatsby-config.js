/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();

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
  "/**/admin",
  "/**/admin/*",
];
const retiredPublicPaths = [
  "/punta-cana-bachelor-party/",
  "/weddings-punta-cana/",
  "/photo-gallery/",
];
const nonIndexablePaths = [
  "/404/",
  "/404.html",
  "/dev-404-page/",
  "/contact/thankyou/",
  "/event-rentals/cart/",
  "/share-your-experience/",
];

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
              !nonIndexablePaths.some(
                (privatePath) =>
                  page.path === privatePath ||
                  page.path === `/es${privatePath}`,
              ) &&
              !retiredPublicPaths.some(
                (retiredPath) =>
                  page.path === retiredPath ||
                  page.path === `/es${retiredPath}`,
              ),
          );
        },
        serialize: (page) => {
          return {
            url: page.path,
            changefreq: `daily`,
            priority: page.path === "/" ? 1.0 : 0.7,
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
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Crimson Pro`,
            file: `https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600&display=swap`,
          },
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap`,
          },
        ],
      },
    },
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
        languages: ["en-US", "es"],
        defaultLanguage: "en-US",
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
            matchPath: "/:lang?/event-rentals",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/floral-art",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/wedding",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/birthday-celebrations",
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
