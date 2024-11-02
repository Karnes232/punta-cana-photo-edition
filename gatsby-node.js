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
      allContentfulPackagePageContent {
        nodes {
          id
          urlSlug
          heroHeading
          packages {
            price
            included
            additions {
              addition
              price
              id
            }
          }
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
          faqs {
            title
            content {
              content
            }
          }
        }
      }
    }
  `);

  const packageTemplate = path.resolve(`src/templates/package.js`);

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
};
