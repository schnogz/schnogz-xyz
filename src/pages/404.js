import Link from 'gatsby-link'
import React from 'react'
import styled from 'styled-components'

import Page from 'components/page'

const CenteredError = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const FourOhFour = () => (
  <Page>
    <CenteredError>
      <h1>404</h1>
      <p>You just hit a route that seems not to exist... the sadness.</p>
      <Link to="/">Back to Homepage</Link>
    </CenteredError>
  </Page>
)

export default FourOhFour
