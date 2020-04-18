import React from 'react'
import styled from 'styled-components'

import Project from 'components/project'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'

const EmojiIcon = styled.span`
  font-size: 70px;
`
export default () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Projects</SectionHeading>}
    rightColumn={
      <>
        <>
          <Project
            abstract="My personal blog where I write about the things that keep me going. Musings will include coding, music, tech, photography, travel and much more."
            logo={
              <EmojiIcon role="img" aria-label="writing emoji">
                ✍🏼️
              </EmojiIcon>
            }
            subtitle={
              <a href="https://theonist.com" target="_blank">
                https://theonist.com
              </a>
            }
            title="The Onist Blog"
          />
          <Project
            abstract="A website that decodes Ethereum blockchain transaction (including ERC20) hashes into readable JSON."
            logo={
              <EmojiIcon role="img" aria-label="open lock emoji">
                🔓
              </EmojiIcon>
            }
            subtitle={
              <a href="https://ethereumdecoder.com" target="_blank">
                https://ethereumdecoder.com
              </a>
            }
            title="Ethereum Decoder"
          />
          <Project
            abstract="An iTerm2 plugin that displays various stats about the Bitcoin blockchain as well as price information of many other top cryptocurrencies."
            logo={
              <EmojiIcon role="img" aria-label="chainlinks emoji">
                ⛓
              </EmojiIcon>
            }
            subtitle={
              <a
                href="https://github.com/schnogz/iterm-blockchain-components"
                target="_blank"
              >
                https://github.com/schnogz/iterm-blockchain-components
              </a>
            }
            title="iTerm2 Blockchain Stats"
          />
          <Project
            abstract="A NodeJS wrapper for Songkick's full REST API available on both NPM and GitHub."
            logo={
              <EmojiIcon role="img" aria-label="package emoji">
                📦
              </EmojiIcon>
            }
            subtitle={
              <a
                href="https://github.com/schnogz/songkick-api-node"
                target="_blank"
              >
                https://github.com/schnogz/songkick-api-node
              </a>
            }
            title="Songkick API Wrapper"
          />
        </>
      </>
    }
  />
)
