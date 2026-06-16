import path from 'path'

import type { GatsbyNode } from 'gatsby'

// expose src/ as a webpack module root so `import Header from 'components/header'`
// (and similar root-style imports) resolve at build time — mirrors tsconfig.json `paths`
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
