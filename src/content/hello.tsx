import React from 'react'
import styled from 'styled-components'

import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.span`
  font-size: ${fontSize.f6};
  color: ${darkMode.white};
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
const Emoji = styled.span`
  font-size: 1.8rem;
  margin-left: 12px;
`

const Hello = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Hello</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          The name is Andrew, pleasure to meet you
          <Emoji>
            <span role='img' aria-label='wave emojii'>
              🙋🏼‍♂️
            </span>
          </Emoji>
        </Heading>
        <p>
          I&apos;m an experienced frontend engineer who contributes across the entire stack, with a
          focus on the Web3 space. I thrive on turning ambitious ideas into production-ready
          products. Pushing boundaries, building secure applications, and helping decentralize the
          web is what drives me.
        </p>
      </>
    }
  />
)

export default Hello
