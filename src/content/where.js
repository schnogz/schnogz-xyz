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
    leftColumn={<SectionHeading>Where</SectionHeading>}
    rightColumn={
      <>
        <Project
          logo={
            <img
              alt="Blockchain.com Logo"
              height="105px"
              rel="preload"
              src={BlockchainLogo}
              width="105px"
            />
          }
          title="Blockchain.com"
          abstract="The most trusted crypto company, helping millions across the globe access and store cryptocurrencies."
        />
        <Project
          logo={
            <img
              alt="Target Logo"
              height="100px"
              rel="preload"
              src={TargetLogo}
              width="100px"
            />
          }
          title="Target"
          abstract="One of the world’s most recognized brands as well as one of America’s leading retailers and technological innovators."
        />
        <Project
          logo={
            <img
              alt="Thomson Reuters logo"
              height="100px"
              rel="preload"
              src={ThomsonReutersLogo}
              width="100px"
            />
          }
          title="Thomson Reuters"
          abstract="A world leading provider of news and information-based tools helping professionals reinvent themselves in the digital age."
        />
      </>
    }
  />
)
