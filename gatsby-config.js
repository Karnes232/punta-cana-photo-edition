/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();
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
          return allPages.filter((page) => !page.path.includes("admin"));
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
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/admin/*", "/**/admin", "/**/admin/*"],
          },
        ],
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
            file: `https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap`,
          },
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap`,
          },
          {
            name: "Playfair Display",
            file: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "G-1JE4933FBR",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "example.com",
        // defaults to false
        enableWebVitalsTracking: true,
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
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
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
            matchPath:
              "/:lang?/blog/complete-guide-to-organizing-events-in-punta-cana",
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
            matchPath: "/:lang?/event-rentals",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/floral-art",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/weddings-punta-cana",
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
            matchPath: "/:lang?/punta-cana-bachelor-party",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:lang?/gender-reveal-and-baby-showers",
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
            matchPath: "/:lang?/photo-gallery",
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
  },
};
