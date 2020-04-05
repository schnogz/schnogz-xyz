import React from 'react'
import styled from 'styled-components'

import Header from 'components/header'
import Spirograph from 'components/spirograph'
import media from 'utils/media-queries'

const HeroSection = styled.section`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  ${media.sm`
    height: calc(100vh - 76px);
  `}
`

export default () => (
  <HeroSection>
    <Spirograph speed={0.075} />
    <Header />
  </HeroSection>
)
