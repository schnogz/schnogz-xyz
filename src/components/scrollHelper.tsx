import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
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

const VIEW_ORDER = [
  'home',
  'hello',
  'experience',
  'projects',
  'coding',
  'music',
  'photography',
] as const

const ScrollHelper = () => {
  useEffect(() => {
    const sections = VIEW_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return undefined

    // fire when a section's top crosses the viewport midpoint
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`
            if (window.location.hash !== newHash) {
              // replaceState (not pushState) so natural scrolling doesn't pollute browser history
              window.history.replaceState(null, '', newHash)
            }
            break
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleScrollToNext = () => {
    const currentHash = window.location.hash.replace('#', '')
    const currentIdx = VIEW_ORDER.findIndex((view) => view === currentHash)
    const nextView =
      currentIdx === VIEW_ORDER.length - 1 ? VIEW_ORDER[0] : VIEW_ORDER[currentIdx + 1]
    void navigate(`#${nextView}`)
  }

  return <ScrollAnimation onClick={handleScrollToNext} />
}

export default ScrollHelper
