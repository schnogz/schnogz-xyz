import React, { useRef, useState, useLayoutEffect } from 'react'
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion'

import { RANGE, SPRING_CONFIG } from './constants'
import { calculateMinHeight } from './helpers'

export default function ParallaxItem({
  className,
  children,
  extraOffset = 500,
}) {
  const { scrollY } = useViewportScroll()
  const ref = useRef()
  const [offsetTop, setOffsetTop] = useState(0)
  const [minHeight, setMinHeight] = useState('auto')

  useLayoutEffect(() => {
    if (!ref.current) return null
    const onResize = () => {
      setOffsetTop(ref.current.offsetTop)
      setMinHeight(calculateMinHeight(RANGE)(ref.current.offsetHeight))
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  const y = useSpring(
    useTransform(
      scrollY,
      [offsetTop - extraOffset, offsetTop + extraOffset],
      ['0%', `${RANGE * 100}%`]
    ),
    SPRING_CONFIG
  )

  return (
    <div style={{ minHeight }} className={className}>
      <motion.div id="parallax" ref={ref} initial={{ y: 0 }} style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
