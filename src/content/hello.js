import React from 'react'
import styled from 'styled-components'

import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

import resume from '../static/Andrew_Schneider_Resume.pdf'

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

const Hello = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Hello</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          The name is Andrew, pleasure to meet you
          <span role='img' aria-label='wave emoji'>
            {' '}
            🙋🏼‍♂️
          </span>
        </Heading>
        <p>
          I&apos;m a frontend developer focused on the Web3 space that strives to bring the ideas of
          the people around me to life. Pushing the boundaries, building secure applications and
          decentralising the web is what gets me out of bed in the morning.
        </p>
        <p>
          Currently job hunting due to lack of funding at my last startup (Dispatch). I am ideally
          looking for work in the Web3 space. Please reach out if you’re hiring or headhunting!
        </p>
        <p style={{ marginBottom: 0 }}>
          <a href={resume} target='_blank' rel='noreferrer'>
            Updated Resume
          </a>
        </p>
      </>
    }
  />
)

export default Hello
