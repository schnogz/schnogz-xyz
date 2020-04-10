import React from 'react'
import styled from 'styled-components'

import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import media from 'utils/media-queries'
import { color, fontSize } from 'styles/theme'

const Heading = styled.span`
  font-size: ${fontSize.f6};
  color: ${color.grey900};
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
    leftColumn={<SectionHeading>Why</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          Because I{' '}
          <span role="img" aria-label="heart emoji">
            {' '}
            ❤️{' '}
          </span>{' '}
          what I do
        </Heading>
        <p>
          I keep a personal blog where I write about the things that keep me
          going. Musings may include coding, music, tech, photography,
          exploration, and whatever else I may fancy that day.
        </p>
        <p>
          <a href="http://theonist.com">The Onist</a>
        </p>
      </>
    }
  />
)
