import React from 'react'
import { useWindowScrollPosition } from '@n8tb1t/use-scroll-position'
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

const VIEW_ORDER = ['#home', '#hello', '#stats', '#projects', '#experience'] as const

const ScrollHelper = () => {
  useWindowScrollPosition(({ currPos }: { currPos: { x: number; y: number } }) => {
    const viewScrollOffsets = VIEW_ORDER.map((view) => {
      const el = document.querySelector(view) as HTMLElement | null
      return el ? el.offsetTop : 0
    })
    const scrollOffsetY = Math.abs(currPos.y)
    viewScrollOffsets.some((viewOffset, index) => {
      if (scrollOffsetY > viewOffset && scrollOffsetY < viewScrollOffsets[index + 1]) {
        window.history.pushState(null, '', VIEW_ORDER[index])
        return true
      }
      if (index === viewScrollOffsets.length - 1 && scrollOffsetY > viewOffset) {
        window.history.pushState(null, '', VIEW_ORDER[VIEW_ORDER.length - 1])
      }
      return false
    })
  })

  const handleScrollToNext = () => {
    const currentViewIdx = VIEW_ORDER.findIndex((view) => view === window.location.hash)
    const nextView =
      currentViewIdx === VIEW_ORDER.length - 1 ? VIEW_ORDER[0] : VIEW_ORDER[currentViewIdx + 1]
    const target = document.querySelector(nextView) as HTMLElement | null
    if (!target) return
    const newPosition = target.offsetTop + 10
    window.scrollTo({ behavior: 'smooth', top: newPosition })
  }

  return <ScrollAnimation onClick={handleScrollToNext} />
}

export default ScrollHelper
