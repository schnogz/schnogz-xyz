import React from 'react'
import styled from 'styled-components'

import Section from 'components/section'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const FooterText = styled.div`
  text-align: center;
  font-size: ${fontSize.f2};
  ${media.lg`
    font-size: ${fontSize.f1};
  `}
  ${media.sm`
    text-align: left;
    font-size: ${fontSize.f1};
  `}
`
const Name = styled.span`
  color: ${darkMode.seagreen};
`

export default () => (
  <Section paddingSmall>
    <FooterText>
      This website is open source! Fork it on{' '}
      <a href="https://github.com/schnogz/schnogzdotcom" target="blank">
        GitHub
      </a>{' '}
      🤓
      <br />© {new Date().getFullYear()} <Name>Andrew Schneider</Name>
    </FooterText>
  </Section>
)
