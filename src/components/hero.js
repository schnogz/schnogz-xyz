import loadable from '@loadable/component'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import Header from 'components/header'
import { darkMode } from 'styles/theme'

const Spirograph = loadable(() => import('./spirograph'))

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
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
  box-shadow: inset 0 0 0 2px ${darkMode.greyDark};
  border-radius: 25px;

  &:before {
    position: absolute;
    font-size: 12px;
    top: 6px;
    right: 8px;
    content: '●';
    animation-name: ${scroll};
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    color: ${darkMode.greyDark};
  }
  &:hover {
    cursor: pointer;
  }
`

const handleScroll = () => {
  document.querySelector('#hello').scrollIntoView({
    behavior: 'smooth',
  })
}

export default () => (
  <HeroSection>
    <Spirograph speed={0.075} />
    <Header />
    <ScrollAnimation onClick={handleScroll} />
  </HeroSection>
)
