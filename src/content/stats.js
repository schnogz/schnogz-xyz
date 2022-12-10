import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import Scrobbles from 'components/scrobbles'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
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
const ScrobbleSection = styled.div`
  padding: 0 0 2.5rem;
`
const GithubSection = styled.div`
  padding-top: 0.5rem;
`
const GithubInto = styled.p`
  margin: 0.25rem 0 1.75rem;
`
const Emoji = styled.span`
  font-size: 1.8rem;
  margin-left: 12px;
`

const ghCalTheme = {
  level0: '#D6EAF8',
  level1: '#7FC3FF',
  level2: '#4D91D8',
  level3: '#3377BE',
  level4: '#00448B',
}

const Stats = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Stats</SectionHeading>}
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
        <Heading>
          Won&apos;t stop improvin&apos;
          <Emoji>
            <span role='img' aria-label='weight lifter emoji'>
              🏋️‍♂️
            </span>
          </Emoji>
        </Heading>
        <GithubSection>
          <GithubInto>
            As you can see in the calendar below, I contribute a ton of code to (mostly) open
            sourced projects on{' '}
            <a href='https://github.com/schnogz' rel='noopener noreferrer' target='blank'>
              GitHub
            </a>
            {'.  '}
            I&apos;m always looking for the next project, so please reach out if you&apos;d like to
            collaborate.
          </GithubInto>
          <GitHubCalendar
            blockMargin={4}
            fontSize={13}
            hideColorLegend
            style={{ margin: '48px 0 32px' }}
            theme={ghCalTheme}
            year={2022}
            username='schnogz'
          >
            <ReactTooltip backgroundColor='black' delayShow={50} html />
          </GitHubCalendar>
          <GitHubCalendar
            blockMargin={4}
            fontSize={13}
            hideColorLegend
            style={{ marginBottom: '32px' }}
            theme={ghCalTheme}
            year={2021}
            username='schnogz'
          >
            <ReactTooltip backgroundColor='black' delayShow={50} html />
          </GitHubCalendar>
          <GitHubCalendar
            blockMargin={4}
            fontSize={13}
            hideColorLegend
            theme={ghCalTheme}
            year={2020}
            username='schnogz'
          >
            <ReactTooltip backgroundColor='black' delayShow={50} html />
          </GitHubCalendar>
        </GithubSection>
      </>
    }
  />
)

export default Stats
