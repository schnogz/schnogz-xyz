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
  const transformValue = useTransform(
    scrollY,
    setTransformRange(offsetTop),
    setTransformValues(RANGE)
  )
  const y = useSpring(transformValue, SPRING_CONFIG)

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
