import React from 'react'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import Project from 'components/project'

import BlockchainLogo from 'img/blockchainLogo.png'
import TargetLogo from 'img/targetLogo.png'
import ThomsonReutersLogo from 'img/thomsonReutersLogo.png'

export default () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Experience</SectionHeading>}
    rightColumn={
      <>
        <Project
          abstract="The most trusted crypto company, helping millions across the globe access and store cryptocurrencies."
          logo={
            <img
              alt="Blockchain.com Logo"
              height="75px"
              rel="preload"
              src={BlockchainLogo}
              width="75px"
            />
          }
          subtitle="Feb 2018 - Present"
          title="Blockchain.com"
        />
        <Project
          abstract="One of the world’s most recognized brands as well as one of America’s leading retailers and technological innovators."
          logo={
            <img
              alt="Target Logo"
              height="70px"
              rel="preload"
              src={TargetLogo}
              width="70px"
            />
          }
          subtitle="Sept 2016 - Feb 2018"
          title="Target"
        />
        <Project
          abstract="A world leading provider of news and information-based tools helping professionals reinvent themselves in the digital age."
          logo={
            <img
              alt="Thomson Reuters logo"
              height="70px"
              rel="preload"
              src={ThomsonReutersLogo}
              width="70px"
            />
          }
          subtitle="Jan 2012 - Sept 2016"
          title="Thomson Reuters"
        />
      </>
    }
  />
)
