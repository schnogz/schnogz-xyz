import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip as MuiTooltip } from '@mui/material'
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

const ghYearsToShow = [2025, 2024, 2022, 2021, 2020]

// there are some style overrides defined in global-styles.js
const GhCalendar = ({ year }) => (
  <GitHubCalendar
    blockMargin={3}
    blockRadius={2}
    blockSize={8}
    theme={{
      dark: ['#424242', '#7FC3FF', '#538bcb', '#256bb4', '#00448B'],
      light: ['#424242', '#7FC3FF', '#538bcb', '#256bb4', '#00448B'],
    }}
    fontSize={12}
    maxLevel={4}
    renderBlock={(block, activity) => (
      <MuiTooltip title={`${activity.count} activities on ${activity.date}`} disableInteractive>
        {block}
      </MuiTooltip>
    )}
    style={{ color: 'white', marginTop: '24px' }}
    year={year}
    username='schnogz'
  />
)

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
          {ghYearsToShow.map((year) => (
            <GhCalendar key={year} year={year} />
          ))}
        </GithubSection>
      </>
    }
  />
)

export default Stats
