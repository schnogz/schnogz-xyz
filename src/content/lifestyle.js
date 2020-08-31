import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import Scrobbles from 'components/scrobbles'
import media from 'utils/media-queries'
import { darkMode, fontSize } from 'styles/theme'

const Heading = styled.span`
  font-size: ${fontSize.f5};
  color: ${darkMode.grey};
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.35;
  ${media.lg`
    font-size: ${fontSize.f4};
    letter-spacing: -0.3px;
  `}
  ${media.sm`
    font-size: ${fontSize.f4};
  `}
`
const ScrobbleSection = styled.div`
  padding: 0 0 2.5rem;
`
const PhotosSection = styled.div`
  padding-top: 2.5rem;
`
const PhotosIntro = styled.p`
  margin: 0.25rem 0 1.75rem;
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

export default () => {
  const images = useStaticQuery(graphql`
    query MyQuery {
      allFile(filter: { relativeDirectory: { eq: "personal" } }) {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <TwoColumns
      wide
      leftColumn={<SectionHeading>Lifestyle</SectionHeading>}
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
              As you can see in the calendar below, I contribute a ton of code
              to (mostly) open sourced projects on{' '}
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
            </GithubIntro>
            <GitHubCalendar fontSize="18" theme={ghCalTheme} username="schnogz">
              <ReactTooltip delayShow={25} html />
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
            <PhotosIntro>
              I am an amateur photographer focusing on landscape, street and
              astrophotography.
            </PhotosIntro>
            <div>
              {images.allFile.edges.map(({ node }) => (
                <Img alt="portfolio image" fluid={node.childImageSharp.fluid} />
              ))}
            </div>
          </PhotosSection>
        </>
      }
    />
  )
}
