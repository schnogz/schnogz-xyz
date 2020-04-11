const path = require('path')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.schnogz.com',
    title: 'Andrew Schneider (Schnogz)',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        components: path.join(__dirname, 'src/components'),
        content: path.join(__dirname, 'src/content'),
        fonts: path.join(__dirname, 'src/fonts'),
        img: path.join(__dirname, 'src/img'),
        layouts: path.join(__dirname, 'src/layouts'),
        pages: path.join(__dirname, 'src/pages'),
        src: path.join(__dirname, 'src'),
        styles: path.join(__dirname, 'src/styles'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-62555232-1',
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://www.google-analytics.com'],
      },
    },
  ],
}
