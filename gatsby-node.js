const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ContentfulPackagePageContent implements Node {
      videoUrl: String
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
          companyName
          facebook
          instagram
          x
          telephone
          messengerLink
        }
      }
      allContentfulPreviousWorkPhotoGallery {
        nodes {
          urlSlug
          title
          id
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
          title
          description
          node_locale
          backgroundImage {
            url
          }
          blogCategory {
            blogCategory
          }
        }
      }
      allContentfulBlogCategories {
        nodes {
          id
          url
          node_locale
        }
      }
    }
  `);
  const localeMapping = {
    "en-US": { path: "", urlCode: "en-US" },
    es: { path: "es", urlCode: "es" },
  };

  const localeMap = {
    "en-US": "en",
    es: "es",
    // Add more languages as needed
  };

  const packageTemplate = path.resolve(`src/template/package.js`);
  const photoGalleryTemplate = path.resolve(`src/template/photogallery.js`);
  const blogTemplate = path.resolve(`src/template/blog.js`);
  const blogCategoryTemplate = path.resolve(`src/template/blogCategory.js`);

  queryResults.data.allContentfulBlogCategories.nodes.forEach((node) => {
    // Get proper language path prefix
    const lang = node.node_locale === "en-US" ? "" : node.node_locale;
    const langPrefix = lang ? `/${lang}` : "";

    createPage({
      path: `${langPrefix}/blog/${node.url?.trim()}`,
      component: blogCategoryTemplate,
      context: {
        id: node.id,
        language: node.node_locale,
        blog: node,
        layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
        // blogList: queryResults.data.allContentfulBlogPost.nodes.filter(
        //   (post) => post.node_locale === node.node_locale,
        // ), // Filter blog posts by language
      },
    });
  });

  // queryResults.data.allContentfulBlogPost.nodes.forEach((node) => {
  //   createPage({
  //     path: `/blog/${node.slug?.trim()}`,
  //     component: blogTemplate,
  //     context: {
  //       id: node.id,
  //       category: node.blogCategory.blogCategory,
  //       blog: node,
  //       layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
  //       // blogList: queryResults.data.allContentfulBlogPost.nodes,
  //     },
  //   });
  // });

  queryResults.data.allContentfulBlogPost.nodes.forEach((node) => {
    // Get language code for URL from the Contentful locale
    const lang = node.node_locale === "en-US" ? "" : node.node_locale;
    const langPrefix = lang ? `/${lang}` : "";
    createPage({
      path: `${langPrefix}/blog/${node.slug?.trim()}`,
      component: blogTemplate,
      context: {
        id: node.id,
        language: node.node_locale, // Pass the language to the template
        category: node.blogCategory.blogCategory,
        blog: node,
        layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
      },
      // defer: true,
    });
  });

  queryResults.data.allContentfulPackagePageContent.nodes.forEach((node) => {
    // Get language code for URL from the Contentful locale
    const lang = node.node_locale === "en-US" ? "" : node.node_locale;
    const langPrefix = lang ? `/${lang}` : "";
    createPage({
      path: `${langPrefix}/packages/${node.urlSlug?.trim()}`,
      component: packageTemplate,
      context: {
        id: node.id,
        language: node.node_locale,
        layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
        package: node,
      },
    });
  });

  queryResults.data.allContentfulPreviousWorkPhotoGallery.nodes.forEach(
    (node) => {
      createPage({
        path: `/photo-gallery/${node.urlSlug?.trim()}`,
        component: photoGalleryTemplate,
        context: {
          id: node.id,
          layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
        },
      });
    },
  );

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
    ([contentfulCode, { path: urlPath, urlCode }]) => {
      // Create index page
      const indexPath = urlPath === "" ? "/" : `/${urlPath}`;
      createPage({
        path: indexPath,
        component: path.resolve("./src/pages/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const adminPath = urlPath === "" ? "/admin" : `/${urlPath}/admin`;
      createPage({
        path: adminPath,
        component: path.resolve("./src/pages/admin/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const contactPath = urlPath === "" ? "/contact" : `/${urlPath}/contact`;
      createPage({
        path: contactPath,
        component: path.resolve("./src/pages/contact/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const photogalleryPath =
        urlPath === "" ? "/photo-gallery" : `/${urlPath}/photo-gallery`;
      createPage({
        path: photogalleryPath,
        component: path.resolve("./src/pages/photo-gallery/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const blogGuidPath =
        urlPath === ""
          ? "/blog/complete-guide-to-organizing-events-in-punta-cana"
          : `/${urlPath}/blog/complete-guide-to-organizing-events-in-punta-cana`;
      createPage({
        path: blogGuidPath,
        component: path.resolve(
          "./src/pages/blog/complete-guide-to-organizing-events-in-punta-cana/index.js",
        ),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const proposalPath =
        urlPath === "" ? "/proposal" : `/${urlPath}/proposal`;
      createPage({
        path: proposalPath,
        component: path.resolve("./src/pages/proposal/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const eventRentalsPath =
        urlPath === "" ? "/event-rentals" : `/${urlPath}/event-rentals`;
      createPage({
        path: eventRentalsPath,
        component: path.resolve("./src/pages/event-rentals/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const weddingsPuntaCanaPath =
        urlPath === ""
          ? "/weddings-punta-cana"
          : `/${urlPath}/weddings-punta-cana`;
      createPage({
        path: weddingsPuntaCanaPath,
        component: path.resolve("./src/pages/weddings-punta-cana/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const floralPath =
        urlPath === "" ? "/floral-art" : `/${urlPath}/floral-art`;
      createPage({
        path: floralPath,
        component: path.resolve("./src/pages/floral-art/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const weddingPath = urlPath === "" ? "/wedding" : `/${urlPath}/wedding`;
      createPage({
        path: weddingPath,
        component: path.resolve("./src/pages/wedding/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const birthdayPath =
        urlPath === ""
          ? "/birthday-celebrations"
          : `/${urlPath}/birthday-celebrations`;
      createPage({
        path: birthdayPath,
        component: path.resolve("./src/pages/birthday-celebrations/index.js"),
        context: {
          language: contentfulCode,
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
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const eventPlannerPath =
        urlPath === "" ? "/event-planner" : `/${urlPath}/event-planner`;
      createPage({
        path: eventPlannerPath,
        component: path.resolve("./src/pages/event-planner/index.js"),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const bachelorPath =
        urlPath === ""
          ? "/punta-cana-bachelor-party"
          : `/${urlPath}/punta-cana-bachelor-party`;
      createPage({
        path: bachelorPath,
        component: path.resolve(
          "./src/pages/punta-cana-bachelor-party/index.js",
        ),
        context: {
          language: contentfulCode,
          urlLanguage: urlCode,
        },
      });

      const genderRevealPath =
        urlPath === ""
          ? "/gender-reveal-and-baby-showers"
          : `/${urlPath}/gender-reveal-and-baby-showers`;
      createPage({
        path: genderRevealPath,
        component: path.resolve(
          "./src/pages/gender-reveal-and-baby-showers/index.js",
        ),
        context: {
          language: contentfulCode,
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
