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

const Spirograph = ({ speed }: SpirographProps) => {
  const movingCanvasRef = useRef<HTMLCanvasElement>(null)
  const plottingCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const movingCanvas = movingCanvasRef.current
    const plottingCanvas = plottingCanvasRef.current
    if (!movingCanvas || !plottingCanvas) return undefined

    const mctx = movingCanvas.getContext('2d')!
    const pctx = plottingCanvas.getContext('2d')!

    let cancelled = false
    let frameId: number | null = null
    let restartTimer: ReturnType<typeof setTimeout> | null = null
    let startTimer: ReturnType<typeof setTimeout> | null = null
    let lastWindowWidth = window.innerWidth

    // mutable spirograph parameters reset by newSpirograph()
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
      const canvasSize = Math.min(1000, window.innerWidth, window.innerHeight)
      movingCanvas.width = canvasSize
      movingCanvas.height = canvasSize
      plottingCanvas.width = canvasSize
      plottingCanvas.height = canvasSize
    }

    const newSpirograph = () => {
      // canvas state (lineWidth, strokeStyle) is reset by width/height changes,
      // so we re-establish it here at every reseed
      mctx.lineWidth = 1.2
      pctx.lineWidth = 1.2

      size = Math.min(498, Math.min(window.innerWidth / 2.8, window.innerHeight / 2.8))

      mctx.clearRect(0, 0, movingCanvas.width, movingCanvas.height)
      pctx.clearRect(0, 0, plottingCanvas.width, plottingCanvas.height)

      const randomM = Math.floor(Math.random() * (100 - 3)) + 3
      const randomN =
        Math.floor(Math.random() * (randomM / 2 - randomM / 10)) + Math.floor(randomM / 10 + 1)
      const [reducedN, reducedM] = reduce(randomN, randomM)
      N = reducedN
      gearRadius = reducedN / reducedM
      f = Math.random() * (0.9 - 0.2) + 0.2

      angle = 0
      centerX = movingCanvas.width / 2
      centerY = movingCanvas.height / 2
      gearX = (1 - gearRadius) * Math.cos(angle) * size
      gearY = (1 - gearRadius) * Math.sin(angle) * size
      spiroX =
        centerX +
        ((1 - gearRadius) * Math.cos(angle) +
          f * gearRadius * Math.cos((1 / gearRadius - 1) * angle)) *
          size
      spiroY =
        centerY +
        ((1 - gearRadius) * Math.sin(angle) -
          f * gearRadius * Math.sin((1 / gearRadius - 1) * angle)) *
          size
      mctx.strokeStyle = darkMode.blackLight

      // plot the outer reference circle once per spirograph
      pctx.strokeStyle = darkMode.greyDark
      pctx.beginPath()
      pctx.arc(centerX, centerY, size, 0, 2 * Math.PI)
      pctx.stroke()
      pctx.strokeStyle = darkMode.blue
    }

    const draw = () => {
      if (cancelled) return

      mctx.clearRect(0, 0, movingCanvas.width, movingCanvas.height)

      // outer gear
      mctx.beginPath()
      mctx.arc(centerX + gearX, centerY + gearY, gearRadius * size, 0, 2 * Math.PI)
      mctx.stroke()

      // inner gear
      mctx.beginPath()
      mctx.arc(centerX + gearX, centerY + gearY, f * gearRadius * size, 0, 2 * Math.PI)
      mctx.stroke()

      // drawing dot
      mctx.beginPath()
      mctx.arc(
        centerX +
          ((1 - gearRadius) * Math.cos(angle) +
            f * gearRadius * Math.cos((1 / gearRadius - 1) * angle)) *
            size,
        centerY +
          ((1 - gearRadius) * Math.sin(angle) -
            f * gearRadius * Math.sin((1 / gearRadius - 1) * angle)) *
            size,
        DOT_SIZE,
        0,
        2 * Math.PI,
      )
      mctx.stroke()

      // is the spirograph still being drawn?
      if (angle - speed < N * 2 * Math.PI) {
        // pick a random color every so often
        if (Math.random() >= 0.95) {
          pctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
        pctx.beginPath()
        pctx.moveTo(spiroX, spiroY)
        spiroX =
          centerX +
          ((1 - gearRadius) * Math.cos(angle) +
            f * gearRadius * Math.cos((1 / gearRadius - 1) * angle)) *
            size
        spiroY =
          centerY +
          ((1 - gearRadius) * Math.sin(angle) -
            f * gearRadius * Math.sin((1 / gearRadius - 1) * angle)) *
            size
        pctx.lineTo(spiroX, spiroY)
        pctx.stroke()
      } else {
        // completed — restart after a brief pause
        mctx.clearRect(0, 0, movingCanvas.width, movingCanvas.height)
        restartTimer = setTimeout(() => {
          if (cancelled) return
          newSpirograph()
          frameId = requestAnimationFrame(draw)
        }, 3000)
        return
      }

      gearX = (1 - gearRadius) * Math.cos(angle) * size
      gearY = (1 - gearRadius) * Math.sin(angle) * size
      angle += speed

      frameId = requestAnimationFrame(draw)
    }

    sizeCanvases()
    newSpirograph()

    // delay drawing so it doesn't fight with the page-load animation
    startTimer = setTimeout(() => {
      frameId = requestAnimationFrame(draw)
    }, 2000)

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
      window.removeEventListener('resize', handleResize)
    }
  }, [speed])

  return (
    <Wrapper {...ROTATE_WHILE_TAP} aria-hidden='true'>
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
