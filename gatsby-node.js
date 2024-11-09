const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
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
};
