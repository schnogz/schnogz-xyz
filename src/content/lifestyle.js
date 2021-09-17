import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import '@browniebroke/gatsby-image-gallery/dist/style.css'

import ImageGallery from 'components/imageGallery'
import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import Scrobbles from 'components/scrobbles'
import media from 'utils/media-queries'
import { darkMode, fontSize } from 'styles/theme'

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
const PhotosSection = styled.div`
  padding-top: 2.5rem;
`
const GithubSection = styled.div`
  padding-top: 0.5rem;

  & > article > div.react-github-calendar__title {
    display: none;
  }

  & > article > div > div.react-github-calendar__meta {
    font-size: 1rem;
    color: ${darkMode.grey};
  }
`
const GithubIntro = styled.p`
  margin: 0.25rem 0 1.75rem;
`
const Emoji = styled.span`
  font-size: 1.8rem;
  margin-left: 12px;
`

const ghCalTheme = {
  background: 'transparent',
  text: darkMode.grey,
  grade4: '#00448B',
  grade3: '#3377BE',
  grade2: '#4D91D8',
  grade1: '#7FC3FF',
  grade0: '#D6EAF8',
}

const currentYear = new Date().getFullYear()

const Stats = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Stats</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          Won't stop groovin'
          <Emoji>
            <span role="img" aria-label="dance emoji">
              🕺🏻
            </span>
          </Emoji>
        </Heading>
        <ScrobbleSection>
          <Scrobbles />
        </ScrobbleSection>
        <Heading>
          Won't stop improvin'
          <Emoji>
            <span role="img" aria-label="weight lifter emoji">
              🏋️‍♂️
            </span>
          </Emoji>
        </Heading>
        <GithubSection>
          <GithubIntro>
            As you can see in the calendar below, I contribute a ton of code to
            (mostly) open sourced projects on{' '}
            <a
              href="https://github.com/schnogz"
              rel="noopener noreferrer"
              target="blank"
            >
              GitHub
            </a>
            {'.  '}
            I'm always looking for the next project, so please reach out if
            you'd like to collaborate.
          </GithubInto>
          <GitHubCalendar
            blockMargin={4}
            fontSize="18"
            fullYear={false}
            theme={ghCalTheme}
            username="schnogz"
          >
            <ReactTooltip backgroundColor="black" delayShow={50} html />
          </GitHubCalendar>
          <GitHubCalendar
            blockMargin={4}
            fontSize="18"
            theme={ghCalTheme}
            username="schnogz"
            years={[currentYear - 1]}
          >
            <ReactTooltip backgroundColor="black" delayShow={50} html />
          </GitHubCalendar>
          <GitHubCalendar
            blockMargin={4}
            fontSize="18"
            theme={ghCalTheme}
            username="schnogz"
            years={[currentYear - 2]}
          >
            <ReactTooltip backgroundColor="black" delayShow={50} html />
          </GitHubCalendar>
        </GithubSection>
        <PhotosSection>
          <Heading>
            Won't stop shootin'
            <Emoji>
              <span role="img" aria-label="camera emoji">
                ️📸
              </span>
            </Emoji>
          </Heading>
          <ImageGallery />
        </PhotosSection>
      </>
    }
  />
)

export default Stats
