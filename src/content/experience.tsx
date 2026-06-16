import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import Project from 'components/project'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'

// optical alignment nudge for logos whose visual center sits to the right of their bounding box
const NudgedLogo = styled.div`
  margin-left: 10px;
`

const Experience = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Experience</SectionHeading>}
    rightColumn={
      <>
        <Project
          abstract='A full-reserve and highly-regulated cryptocurrency exchange and custodian. Focused on providing innovative security solutions to protect your crypto.'
          logo={
            <NudgedLogo>
              <StaticImage alt='Gemini Logo' src='../img/geminiLogo2.png' width={70} height={70} />
            </NudgedLogo>
          }
          subtitle='Dec 2024 - Feb 2026'
          title='Gemini'
        />
        <Project
          abstract='E-commerce startup meeting customers where they are via embeddable ads and shoppable content. Originally focused on EVM on-chain messaging for protocols and smart contracts.'
          logo={
            <NudgedLogo>
              <StaticImage
                alt='Dispatch Logo'
                src='../img/dispatchLogo.png'
                width={70}
                height={70}
              />
            </NudgedLogo>
          }
          subtitle='Aug 2022 - Oct 2024'
          title='Dispatch'
        />
        <Project
          abstract='The most trusted crypto company, helping millions across the globe access and store cryptocurrencies.'
          logo={
            <StaticImage
              alt='Blockchain.com Logo'
              src='../img/blockchainLogo.png'
              width={75}
              height={75}
            />
          }
          subtitle='Feb 2018 - Aug 2022'
          title='Blockchain.com'
        />
        <Project
          abstract='One of the world’s most recognized brands as well as one of America’s leading retailers and technological innovators.'
          logo={
            <StaticImage alt='Target Logo' src='../img/targetLogo.png' width={70} height={70} />
          }
          subtitle='Sept 2016 - Feb 2018'
          title='Target'
        />
        <Project
          abstract='A world leading provider of news and information-based tools helping professionals reinvent themselves in the digital age.'
          logo={
            <StaticImage
              alt='Thomson Reuters logo'
              src='../img/thomsonReutersLogo.png'
              width={70}
              height={70}
            />
          }
          subtitle='Jan 2012 - Sept 2016'
          title='Thomson Reuters'
        />
      </>
    }
  />
)

export default Experience
