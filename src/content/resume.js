import React from 'react'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import Project from 'components/project'
import ParallaxItem from 'components/parallaxItem'

import BlockchainLogo from 'img/blockchainLogo.png'
import TargetLogo from 'img/targetLogo.png'
import ThomsonReutersLogo from 'img/thomsonReutersLogo.png'

const OFFSET = 200

export default () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Experience</SectionHeading>}
    rightColumn={
      <>
        <ParallaxItem extraOffset={OFFSET}>
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
        </ParallaxItem>
        <ParallaxItem extraOffset={OFFSET}>
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
        </ParallaxItem>
        <ParallaxItem extraOffset={OFFSET}>
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
        </ParallaxItem>
      </>
    }
  />
)
