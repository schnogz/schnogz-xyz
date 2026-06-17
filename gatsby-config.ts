import path from 'path'

import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://www.schnogz.xyz',
    title: 'schnogz.xyz',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/img'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'photos',
        path: path.join(__dirname, 'src/photos'),
      },
      resolve: 'gatsby-source-filesystem',
    },
  ],
}

export default config
