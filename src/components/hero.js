import React from 'react'
import styled, { keyframes } from 'styled-components'

import Header from 'components/header'
import Spirograph from 'components/spirograph'
import media from 'utils/media-queries'
import { color } from 'styles/theme'

const HeroSection = styled.section`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  ${media.sm`
    height: calc(100vh - 76px);
  `}
`

const scroll = keyframes`
  0% {
    opacity: 0.8;
  }
  100% {
  	opacity: 0;
    top: 32px;
  }
`

const ScrollAnimation = styled.div`
  position: absolute;
  width: 25px;
  height: 48px;
  bottom: 20px;
  right: 30px;
  box-shadow: inset 0 0 0 2px ${color.grey800};
  border-radius: 25px;

  &:before {
    position: absolute;
    font-size: 12px;
    top: 6px;
    right: 8px;
    content: '●';
    animation-name: ${scroll};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  &:hover {
    cursor: pointer;
  }
`

const handleScroll = () => {
  const SCROLL_SECTION = '#who'
  const el = document.querySelector(SCROLL_SECTION)
  window.location.hash = SCROLL_SECTION
  window.scrollTo({
    behavior: 'smooth',
    top: el.offsetTop,
  })
}

export default () => (
  <HeroSection>
    <Spirograph speed={0.075} />
    <Header />
    <ScrollAnimation onClick={handleScroll} />
  </HeroSection>
)
