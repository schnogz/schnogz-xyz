import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
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
    leftColumn={<SectionHeading>When</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          I'll never stop improving{' '}
          <span role="img" aria-label="weight lifter emoji">
            {' '}
            🏋️‍♂️
          </span>
        </Heading>
        <p>
          <GitHubCalendar fontSize="18" username="schnogz">
            <ReactTooltip delayShow={25} html />
          </GitHubCalendar>
        </p>
      </>
    }
  />
)
