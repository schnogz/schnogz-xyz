import React from 'react'
import styled from 'styled-components'

import Project from 'components/project'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'

const EmojiIcon = styled.span`
  font-size: 70px;
`
const Projects = () => (
  <TwoColumns
    wide
    leftColumn={<SectionHeading>Projects</SectionHeading>}
    rightColumn={
      <>
        <Project
          abstract='An iTerm2 plugin that displays various stats about the Bitcoin blockchain as well as price information of many other top cryptocurrencies.'
          logo={
            <EmojiIcon>
              <span aria-label='chainlinks emoji'>⛓</span>
            </EmojiIcon>
          }
          subtitle={
            <a
              href='https://github.com/schnogz/iterm-blockchain-components'
              rel='noopener noreferrer'
              target='_blank'
            >
              https://github.com/schnogz/iterm-blockchain-components
            </a>
          }
          title='iTerm2 Blockchain Stats'
        />
        <Project
          abstract='Node.js CLI tool to extract an encrypted Blockchain.com wallet payload from a wallet GUID.'
          logo={
            <EmojiIcon>
              <span role='img' aria-label='wallet emoji'>
                🪪
              </span>
            </EmojiIcon>
          }
          subtitle={
            <a href='https://blog.schnogz.xyz' rel='noopener noreferrer' target='_blank'>
              https://github.com/schnogz/bcdc-encrypted-wallet-extract
            </a>
          }
          title='Blockchain.com Payload Extractor'
        />
        <Project
          abstract='A website that decodes Ethereum blockchain transaction hashes (including ERC20) into readable JSON.'
          logo={
            <EmojiIcon role='img' aria-label='open lock emoji'>
              <span role='img' aria-label='open lock emoji'>
                🔓
              </span>
            </EmojiIcon>
          }
          subtitle={
            <a href='https://ethereumdecoder.com' rel='noopener noreferrer' target='_blank'>
              https://ethereumdecoder.com
            </a>
          }
          title='Ethereum Decoder'
        />
        <Project
          abstract="A NodeJS wrapper for Songkick's full REST API available on both NPM and GitHub."
          logo={
            <EmojiIcon>
              <span role='img' aria-label='package emoji'>
                📦
              </span>
            </EmojiIcon>
          }
          subtitle={
            <a
              href='https://github.com/schnogz/songkick-api-node'
              rel='noopener noreferrer'
              target='_blank'
            >
              https://github.com/schnogz/songkick-api-node
            </a>
          }
          title='Songkick API Wrapper'
        />
      </>
    }
  />
)

export default Projects
