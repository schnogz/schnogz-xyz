import React from 'react'
import styled from 'styled-components'

import Section from 'components/section'
import { fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const FooterText = styled.div`
  text-align: center;
  font-size: ${fontSize.f2};
  ${media.lg`
    font-size: ${fontSize.f1};
  `}
  ${media.sm`
    text-align: center;
    font-size: 13px;
    padding: 28px 16px;
    line-height: 1.7;
  `}
`

const Footer = () => (
  <Section paddingSmall>
    <FooterText>
      This website is open source! Fork it on{' '}
      <a href='https://github.com/schnogz/schnogzdotcom' target='_blank' rel='noopener noreferrer'>
        GitHub
      </a>{' '}
      🤓
      <br />© {new Date().getFullYear()} Andrew Schneider
    </FooterText>
  </Section>
)

export default Footer
