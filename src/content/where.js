import React  from 'react'

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
          logo={<img src={BlockchainLogo} height="105px" width="105px" alt="Blockchain.com Logo"/>}
          title="Blockchain.com"
          abstract="The most trusted crypto company, helping millions across the globe access and store cryptocurrencies."
        />
        <Project
          logo={<img src={TargetLogo} height="100px" width="100px" alt="Target Logo"/>}
          title="Target"
          abstract="One of the world’s most recognized brands as well as one of America’s leading retailers and technological innovators."
        />
        <Project
          logo={<img src={ThomsonReutersLogo} height="100px" width="100px" alt="Thomson Reuters logo"/>}
          title="Thomson Reuters"
          abstract="A world leading provider of news and information-based tools helping professionals reinvent themselves in the digital age."
        />
      </>
    }
  />
)
