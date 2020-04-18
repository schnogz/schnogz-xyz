import React from 'react'
import styled from 'styled-components'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.span`
  font-size: ${fontSize.f6};
  color: ${darkMode.grey};
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.35;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.sm`
    font-size: ${fontSize.f5};
  `}
`

export default () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Hello</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          The name is Andrew, pleasure to meet you
          <span role="img" aria-label="wave emoji">
            {' '}
            🙋🏼‍♂️
          </span>
        </Heading>
        <p>
          I'm a web developer that strives to bring the ideas of the people
          around me to life. Building scalable web applications that are
          delightfully responsive down to that last pixel is what I live for.
        </p>
        <p style={{ marginBottom: 0 }}>
          Currently leading development on an open source cryptocurrency wallet
          for{' '}
          <a href="https://blockchain.com" target="blank">
            Blockchain.com
          </a>
          .
        </p>
      </>
    }
  />
)
