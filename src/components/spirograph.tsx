import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { darkMode } from 'styles/theme'
import { ROTATE_WHILE_TAP } from 'utils/animations'

const debounce = <Args extends unknown[]>(fn: (...args: Args) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: Args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

const reduce = (numerator: number, denominator: number): [number, number] => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
  const divisor = gcd(numerator, denominator)
  return [numerator / divisor, denominator / divisor]
}

// pre-generated palette — avoids per-frame string allocation in the hot path
const COLOR_PALETTE = Array.from(
  { length: 32 },
  () =>
    '#' +
    Math.floor(Math.random() * 16_777_215)
      .toString(16)
      .padStart(6, '0'),
)

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
`
const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type SpirographProps = {
  speed: number
}

const DOT_SIZE = 7
const STARTUP_DELAY_MS = 800
// cap DPR — going beyond 2x quadruples per-frame fill cost for diminishing visual returns
const MAX_DPR = 2

const Spirograph = ({ speed }: SpirographProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const movingCanvasRef = useRef<HTMLCanvasElement>(null)
  const plottingCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const movingCanvas = movingCanvasRef.current
    const plottingCanvas = plottingCanvasRef.current
    if (!wrapper || !movingCanvas || !plottingCanvas) return undefined

    // respect reduced-motion preference — no animation at all
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const mctx = movingCanvas.getContext('2d')!
    const pctx = plottingCanvas.getContext('2d')!

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

    let cancelled = false
    let inView = true
    let hasStarted = false
    let frameId: number | null = null
    let restartTimer: ReturnType<typeof setTimeout> | null = null
    let startTimer: ReturnType<typeof setTimeout> | null = null
    let lastWindowWidth = window.innerWidth

    // logical (CSS) canvas size — all math operates in this space
    let canvasSize: number
    let size: number
    let N: number
    let gearRadius: number
    let f: number
    let angle: number
    let centerX: number
    let centerY: number
    let gearX: number
    let gearY: number
    let spiroX: number
    let spiroY: number

    const sizeCanvases = () => {
      canvasSize = Math.min(1000, window.innerWidth, window.innerHeight)
      const physicalSize = canvasSize * dpr
      movingCanvas.width = physicalSize
      movingCanvas.height = physicalSize
      plottingCanvas.width = physicalSize
      plottingCanvas.height = physicalSize
      movingCanvas.style.width = `${canvasSize}px`
      movingCanvas.style.height = `${canvasSize}px`
      plottingCanvas.style.width = `${canvasSize}px`
      plottingCanvas.style.height = `${canvasSize}px`
      // scale the context so all draw calls can use logical (CSS) coords
      mctx.scale(dpr, dpr)
      pctx.scale(dpr, dpr)
    }

    const newSpirograph = () => {
      // canvas state (lineWidth, strokeStyle, transform) is reset when width/height changes,
      // so we re-establish it here at every reseed
      mctx.lineWidth = 1.2
      pctx.lineWidth = 1.2

      size = Math.min(498, Math.min(window.innerWidth / 2.8, window.innerHeight / 2.8))

      mctx.clearRect(0, 0, canvasSize, canvasSize)
      pctx.clearRect(0, 0, canvasSize, canvasSize)

      const randomM = Math.floor(Math.random() * (100 - 3)) + 3
      const randomN =
        Math.floor(Math.random() * (randomM / 2 - randomM / 10)) + Math.floor(randomM / 10 + 1)
      const [reducedN, reducedM] = reduce(randomN, randomM)
      N = reducedN
      gearRadius = reducedN / reducedM
      f = Math.random() * (0.9 - 0.2) + 0.2

      angle = 0
      centerX = canvasSize / 2
      centerY = canvasSize / 2
      const cos0 = Math.cos(angle)
      const sin0 = Math.sin(angle)
      const innerAngle0 = (1 / gearRadius - 1) * angle
      gearX = (1 - gearRadius) * cos0 * size
      gearY = (1 - gearRadius) * sin0 * size
      spiroX = centerX + ((1 - gearRadius) * cos0 + f * gearRadius * Math.cos(innerAngle0)) * size
      spiroY = centerY + ((1 - gearRadius) * sin0 - f * gearRadius * Math.sin(innerAngle0)) * size
      mctx.strokeStyle = darkMode.blackLight

      // plot the outer reference circle once per spirograph
      pctx.strokeStyle = darkMode.greyDark
      pctx.beginPath()
      pctx.arc(centerX, centerY, size, 0, 2 * Math.PI)
      pctx.stroke()
      pctx.strokeStyle = darkMode.blue
    }

    const draw = () => {
      // gate: should we even be drawing this frame?
      if (cancelled || !inView || document.hidden || !hasStarted) {
        frameId = null
        return
      }

      // tighter clear — only the bounding box that the gear-and-dot inhabit
      const clearX = centerX - size
      const clearY = centerY - size
      const clearSize = 2 * size
      mctx.clearRect(clearX, clearY, clearSize, clearSize)

      // cache trig — same `angle` would otherwise produce up to 6 redundant calls
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)
      const innerAngle = (1 / gearRadius - 1) * angle
      const cosInner = Math.cos(innerAngle)
      const sinInner = Math.sin(innerAngle)

      // outer gear
      mctx.beginPath()
      mctx.arc(centerX + gearX, centerY + gearY, gearRadius * size, 0, 2 * Math.PI)
      mctx.stroke()

      // inner gear
      mctx.beginPath()
      mctx.arc(centerX + gearX, centerY + gearY, f * gearRadius * size, 0, 2 * Math.PI)
      mctx.stroke()

      // drawing dot at the spiro tip
      const dotX = centerX + ((1 - gearRadius) * cosAngle + f * gearRadius * cosInner) * size
      const dotY = centerY + ((1 - gearRadius) * sinAngle - f * gearRadius * sinInner) * size
      mctx.beginPath()
      mctx.arc(dotX, dotY, DOT_SIZE, 0, 2 * Math.PI)
      mctx.stroke()

      // is the curve still being drawn?
      if (angle - speed < N * 2 * Math.PI) {
        // pick a random color every so often (palette lookup — no string alloc)
        if (Math.random() >= 0.95) {
          pctx.strokeStyle = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
        }
        pctx.beginPath()
        pctx.moveTo(spiroX, spiroY)
        spiroX = dotX
        spiroY = dotY
        pctx.lineTo(spiroX, spiroY)
        pctx.stroke()
      } else {
        // completed — restart after a brief pause
        mctx.clearRect(clearX, clearY, clearSize, clearSize)
        restartTimer = setTimeout(() => {
          restartTimer = null
          if (cancelled) return
          newSpirograph()
          scheduleFrame()
        }, 3000)
        frameId = null
        return
      }

      gearX = (1 - gearRadius) * cosAngle * size
      gearY = (1 - gearRadius) * sinAngle * size
      angle += speed

      frameId = requestAnimationFrame(draw)
    }

    const scheduleFrame = () => {
      if (frameId !== null) return
      if (cancelled || !hasStarted || !inView || document.hidden) return
      frameId = requestAnimationFrame(draw)
    }

    sizeCanvases()
    newSpirograph()

    // delay drawing so it doesn't fight with the page-load animation
    startTimer = setTimeout(() => {
      startTimer = null
      hasStarted = true
      scheduleFrame()
    }, STARTUP_DELAY_MS)

    // pause when scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) {
          scheduleFrame()
        } else if (frameId !== null) {
          cancelAnimationFrame(frameId)
          frameId = null
        }
      },
      { threshold: 0 },
    )
    observer.observe(wrapper)

    // pause when tab is hidden — RAF would auto-throttle anyway, but this also
    // stops the restart-timer from kicking the animation back to life
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frameId !== null) {
          cancelAnimationFrame(frameId)
          frameId = null
        }
      } else {
        scheduleFrame()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const handleResize = debounce(() => {
      // iOS Safari fires resize on scroll without actually changing the width
      if (window.innerWidth === lastWindowWidth) return
      lastWindowWidth = window.innerWidth
      sizeCanvases()
      newSpirograph()
    }, 500)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      if (frameId !== null) cancelAnimationFrame(frameId)
      if (restartTimer !== null) clearTimeout(restartTimer)
      if (startTimer !== null) clearTimeout(startTimer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [speed])

  return (
    <Wrapper {...ROTATE_WHILE_TAP} aria-hidden='true' ref={wrapperRef}>
      <CanvasWrapper>
        <canvas ref={plottingCanvasRef} />
      </CanvasWrapper>
      <CanvasWrapper>
        <canvas ref={movingCanvasRef} />
      </CanvasWrapper>
    </Wrapper>
  )
}

export default Spirograph
