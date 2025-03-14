const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

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
          backgroundImage {
            gatsbyImage(width: 2000, placeholder: BLURRED, formats: WEBP)
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
    createPage({
      path: `/blog/${node.url?.trim()}`,
      component: blogCategoryTemplate,
      context: {
        id: node.id,
        blog: node,
        layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
        blogList: queryResults.data.allContentfulBlogPost.nodes,
      },
    });
  });

  queryResults.data.allContentfulBlogPost.nodes.forEach((node) => {
    createPage({
      path: `/blog/${node.slug?.trim()}`,
      component: blogTemplate,
      context: {
        id: node.id,
        category: node.blogCategory.blogCategory,
        blog: node,
        layout: queryResults.data.allContentfulGeneralLayout.nodes[0],
        // blogList: queryResults.data.allContentfulBlogPost.nodes,
      },
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

      fs.writeFileSync(path.join(dir, "favicon.png"), buffer);
      reporter.success("Successfully downloaded favicon from Contentful");
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
};
