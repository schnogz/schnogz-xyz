import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'

import Scrobbles from 'components/scrobbles'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

// lazy-loaded — react-github-calendar pulls in @floating-ui/react which doesn't SSR
const GithubCalendarSection = lazy(() => import('components/githubCalendarSection'))

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
// reserve vertical space so the client-side calendar render doesn't shift the page
const CalendarPlaceholder = styled.div`
  min-height: 540px;
`

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
            I contribute a ton of code to (mostly) open sourced projects on{' '}
            <a href='https://github.com/schnogz' rel='noopener noreferrer' target='_blank'>
              GitHub
            </a>
            {'.  '}
            I&apos;m always looking for the next project, so please reach out if you&apos;d like to
            collaborate.
          </GithubInto>
          <Suspense fallback={<CalendarPlaceholder />}>
            <GithubCalendarSection />
          </Suspense>
        </GithubSection>
      </>
    }
  />
)

export default Stats
