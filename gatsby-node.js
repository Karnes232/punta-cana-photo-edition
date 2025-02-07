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
    }
  `);

  const packageTemplate = path.resolve(`src/template/package.js`);
  const photoGalleryTemplate = path.resolve(`src/template/photogallery.js`);

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
    console.log(faviconUrl);
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
