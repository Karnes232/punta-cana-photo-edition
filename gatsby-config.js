/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Punta Cana Photo Edition`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "",
      "spaceId": ""
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-postcss", "gatsby-plugin-google-gtag", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};