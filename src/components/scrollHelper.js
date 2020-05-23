import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { darkMode } from 'styles/theme'

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
  position: fixed;
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

const VIEW_ORDER = ['hero', 'hello', 'stats', 'projects', 'experience']

export default () => {
  const [currentView, setCurrentView] = useState('hero')

  const handleScroll = () => {
    const currentViewIdx = VIEW_ORDER.findIndex((view) => view === currentView)
    const nextView =
      currentViewIdx === VIEW_ORDER.length - 1
        ? VIEW_ORDER[0]
        : VIEW_ORDER[currentViewIdx + 1]
    document.querySelector(`#${nextView}`).scrollIntoView({
      behavior: 'smooth',
    })
    setCurrentView(nextView)
  }

  return <ScrollAnimation onClick={handleScroll} />
}
