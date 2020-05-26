import React, { useRef, useState, useLayoutEffect } from 'react'
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion'

import { RANGE, SPRING_CONFIG } from './constants'
import {
  calculateMinHeight,
  setTransformRange,
  setTransformValues,
} from './helpers'

export default function ParallaxItem({ children }) {
  const ref = useRef()
  const [offsetTop, setOffsetTop] = useState(0)
  const [minHeight, setMinHeight] = useState('auto')
  const { scrollY } = useViewportScroll()
  // useTransform takes a value and maps it to another one
  // https://www.framer.com/api/motion/motionvalue#usetransform
  const transformValue = useTransform(
    scrollY,
    setTransformRange(offsetTop),
    setTransformValues(RANGE)
  )
  // useSpring makes an animation that simulates spring physics for realistic motion.
  // https://www.framer.com/api/motion/types/#spring
  const y = useSpring(transformValue, SPRING_CONFIG)

  // useLayoutEffect will trigger only when the ref changes
  // it sets a min-height to the parallax wrapper to avoid content (scrobbles) overlapping
  useLayoutEffect(() => {
    setOffsetTop(ref.current.offsetTop)
    setMinHeight(calculateMinHeight(RANGE)(ref.current.offsetHeight))
  }, [ref])

  return (
    <div style={{ minHeight }}>
      <motion.div ref={ref} initial={{ y: 0 }} style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
