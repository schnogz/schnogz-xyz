import React from 'react'

import TwoColumns from 'components/twoColumns'
import Project from 'components/project'
import SectionHeading from 'components/sectionHeading'
import OnistLogo from 'img/onistLogo.png'

export default () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Why</SectionHeading>}
    rightColumn={
      <Project
        logo={<img src={OnistLogo} height="90px" width="90px" alt="The Onist Logo"/>}
        title="The Onist"
        abstract="A personal blog where I write about the things that keep me going. Musings may include coding, music, tech, photography, exploration, and whatever else I may fancy that day."
        link={<a href="http://theonist.com">Check It Out</a>}
      />
    }
  />
)
