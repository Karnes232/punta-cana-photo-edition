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
      allContentfulPackagePage {
        nodes {
          id
          urlSlug
          package
          heroHeading
          included
          videoUrl
          heroImageList {
            gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
            title
          }
          packageInformation {
            raw
          }
          images {
            title
            gatsbyImage(width: 4000, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
    }
  `);

  const packageTemplate = path.resolve(`src/templates/package.js`);

  queryResults.data.allContentfulPackagePage.nodes.forEach((node) => {
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
};
