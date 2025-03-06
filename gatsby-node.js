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
    createPage({
      path: `/packages/${node.urlSlug?.trim()}`,
      component: packageTemplate,
      context: {
        id: node.id,
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
};
