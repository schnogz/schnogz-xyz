import React from 'react'

import Project from 'components/project'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import BlockchainLogo from 'img/blockchainLogo.png'
import DispatchLogo from 'img/dispatchLogo.png'
import GeminiLogo from 'img/geminiLogo2.png'
import TargetLogo from 'img/targetLogo.png'
import ThomsonReutersLogo from 'img/thomsonReutersLogo.png'

const Experience = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Experience</SectionHeading>}
    rightColumn={
      <>
        <Project
          abstract='A full-reserve and highly-regulated cryptocurrency exchange and custodian. Focused on providing innovative security solutions to protect your crypto.'
          logo={
            <img
              alt='Gemini Logo'
              height='70px'
              rel='preload'
              src={GeminiLogo}
              width='70px'
              style={{ marginLeft: '10px' }}
            />
          }
          subtitle='Dec 2024 - Present'
          title='Gemini'
        />
        <Project
          abstract='E-commerce startup meeting customers where they are via embeddable ads and shoppable content. Originally focused on EVM on-chain messaging for protocols and smart contracts.'
          logo={
            <img
              alt='Dispatch Logo'
              height='70px'
              rel='preload'
              src={DispatchLogo}
              width='70px'
              style={{ marginLeft: '10px' }}
            />
          }
          subtitle='Aug 2022 - Oct 2024'
          title='Dispatch'
        />
        <Project
          abstract='The most trusted crypto company, helping millions across the globe access and store cryptocurrencies.'
          logo={
            <img
              alt='Blockchain.com Logo'
              height='75px'
              rel='preload'
              src={BlockchainLogo}
              width='75px'
            />
          }
          subtitle='Feb 2018 - Aug 2022'
          title='Blockchain.com'
        />
        <Project
          abstract='One of the world’s most recognized brands as well as one of America’s leading retailers and technological innovators.'
          logo={<img alt='Target Logo' height='70px' rel='preload' src={TargetLogo} width='70px' />}
          subtitle='Sept 2016 - Feb 2018'
          title='Target'
        />
        <Project
          abstract='A world leading provider of news and information-based tools helping professionals reinvent themselves in the digital age.'
          logo={
            <img
              alt='Thomson Reuters logo'
              height='70px'
              rel='preload'
              src={ThomsonReutersLogo}
              width='70px'
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
