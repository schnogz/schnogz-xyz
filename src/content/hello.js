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

const Hello = () => (
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
          around me to life. Pushing the boundaries of web forward, and
          transitioning it to web3 and blockchain technology, is what gets me
          out of bed in the morning.
        </p>
        <p style={{ marginBottom: 0 }}>
          Currently building the future of web3 on-chain messaging and user
          engagement at{' '}
          <a href="https://dispatch.xyz" target="blank">
            Dispatch
          </a>
          .
        </p>
      </>
    }
  />
)

export default Hello
