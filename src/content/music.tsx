import React from 'react'
import styled from 'styled-components'

import Scrobbles from 'components/scrobbles'
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
const ScrobbleSection = styled.div`
  padding-top: 0.5rem;
`

const Music = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Music</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          Won&apos;t stop groovin&apos;
          <Emoji>
            <span role='img' aria-label='dance emoji'>
              🕺🏻
            </span>
          </Emoji>
        </Heading>
        <ScrobbleSection>
          <Scrobbles />
        </ScrobbleSection>
      </>
    }
  />
)

export default Music
