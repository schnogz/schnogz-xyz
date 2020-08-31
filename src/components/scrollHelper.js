import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

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

const VIEW_ORDER = ['#home', '#hello', '#lifestyle', '#projects', '#experience']

export default () => {
  // update hash url on page scroll
  useScrollPosition(({ currPos }) => {
    // get offsets of sections
    const view_scroll_offsets = VIEW_ORDER.map((view) => {
      const el = document.querySelector(view)
      return el ? el.offsetTop : 0
    })
    // current scroll position
    const scrollOffsetY = Math.abs(currPos.y)
    // detect current section and update hash location
    view_scroll_offsets.some((viewOffset, index) => {
      // detect sections that are not the last
      if (
        scrollOffsetY > viewOffset &&
        scrollOffsetY < view_scroll_offsets[index + 1]
      ) {
        window.history.pushState(null, null, VIEW_ORDER[index])
        return true
      }
      // detect scroll in last section
      if (
        index === view_scroll_offsets.length - 1 &&
        scrollOffsetY > viewOffset
      ) {
        window.history.pushState(null, null, VIEW_ORDER[VIEW_ORDER.length - 1])
      }
      // no match on this iteration, go to next
      return false
    })
  })

  const handleScrollToNext = () => {
    const currentViewIdx = VIEW_ORDER.findIndex(
      (view) => view === window.location.hash
    )
    const nextView =
      currentViewIdx === VIEW_ORDER.length - 1
        ? VIEW_ORDER[0]
        : VIEW_ORDER[currentViewIdx + 1]
    // add 10px offset to ensure new hash location is update
    const newPosition = document.querySelector(nextView).offsetTop + 10
    window.scrollTo({ top: newPosition, behavior: 'smooth' })
    // window.history.pushState(null, null, nextView)
  }

  return <ScrollAnimation onClick={handleScrollToNext} />
}
