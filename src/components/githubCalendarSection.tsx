import React from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import styled from 'styled-components'

// some style overrides defined in styles/global-style.ts
const CalendarWrapper = styled.div`
  color: white;
  margin-top: 24px;
  /* contain the calendar's intrinsic width — on narrow screens it overflows,
     this keeps it scrollable within its own lane instead of pushing the page sideways */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* hide native scrollbar — swipe gesture still works */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const GH_YEARS_TO_SHOW = [2025, 2024, 2022, 2021, 2020]

const GhCalendar = ({ year }: { year: number }) => (
  <CalendarWrapper>
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
      // SVG <title> renders as a native browser tooltip on hover — free, accessible, no JS
      renderBlock={(block, activity) =>
        React.cloneElement(
          block,
          {},
          <title>{`${activity.count} activities on ${activity.date}`}</title>,
        )
      }
      year={year}
      username='schnogz'
    />
  </CalendarWrapper>
)

const GithubCalendarSection = () => (
  <>
    {GH_YEARS_TO_SHOW.map((year) => (
      <GhCalendar key={year} year={year} />
    ))}
  </>
)

export default GithubCalendarSection
