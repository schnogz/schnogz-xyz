import debounce from 'lodash/debounce'
import React from 'react'
import styled from 'styled-components'

import { color } from 'styles/theme'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
let windowWidth

export default class Spirograph extends React.Component {
  constructor(props) {
    super(props)
    this.draw = this.draw.bind(this)
    this.hasUnmounted = false
    this._resizeHandler = debounce(() => {
      if (window.innerWidth !== windowWidth) {
        //check if window size has actually changed bc of iOS Safari Bug
        this.canvasSize = Math.min(1000, window.innerWidth, window.innerHeight)
        this.movingCanvas.width = this.canvasSize
        this.movingCanvas.height = this.canvasSize
        this.plottingCanvas.width = this.canvasSize
        this.plottingCanvas.height = this.canvasSize
        this.newSpirograph()
        windowWidth = window.innerWidth
      }
    }, 500)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resizeHandler)
    windowWidth = window.innerWidth

    this.mctx = this.movingCanvas.getContext('2d')
    this.pctx = this.plottingCanvas.getContext('2d')
    this.canvasSize = Math.min(1000, window.innerWidth, window.innerHeight)
    this.movingCanvas.width = this.canvasSize
    this.movingCanvas.height = this.canvasSize
    this.plottingCanvas.width = this.canvasSize
    this.plottingCanvas.height = this.canvasSize

    this.newSpirograph()
    window.requestAnimationFrame(this.draw)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
    this.hasUnmounted = true
  }

  // helper function
  reduce(numerator, denominator) {
    let gcd = function (a, b) {
      return b ? gcd(b, a % b) : a
    }
    gcd = gcd(numerator, denominator)
    return [numerator / gcd, denominator / gcd]
  }

  delay = (t) => new Promise((resolve) => setTimeout(resolve, t))

  newSpirograph() {
    // display config
    this.size = Math.min(
      498,
      Math.min(window.innerWidth / 2.8, window.innerHeight / 2.8)
    )
    this.dotSize = 7
    this.spiroColor = color.blue700
    this.circleColor = color.grey400
    this.speed = this.props.speed
    this.mctx.lineWidth = 1.2
    this.pctx.lineWidth = 1.2

    // clear canvas
    this.mctx.clearRect(0, 0, this.movingCanvas.width, this.movingCanvas.height)
    this.pctx.clearRect(0, 0, this.movingCanvas.width, this.movingCanvas.height)

    // get random gear values
    const randomM = Math.floor(Math.random() * (100 - 3)) + 3
    const randomN =
      Math.floor(Math.random() * (randomM / 2 - randomM / 10)) +
      Math.floor(randomM / 10 + 1)
    this.N = this.reduce(randomN, randomM)[0]
    this.M = this.reduce(randomN, randomM)[1]
    this.gearRadius = this.N / this.M
    this.f = Math.random() * (0.9 - 0.2) + 0.2

    // calculate gear values
    this.angle = 0
    this.centerX = this.movingCanvas.width / 2
    this.centerY = this.movingCanvas.height / 2
    this.gearX = (1 - this.gearRadius) * Math.cos(this.angle) * this.size
    this.gearY = (1 - this.gearRadius) * Math.sin(this.angle) * this.size
    this.spiroX =
      this.centerX +
      ((1 - this.gearRadius) * Math.cos(this.angle) +
        this.f *
          this.gearRadius *
          Math.cos((1 / this.gearRadius - 1) * this.angle)) *
        this.size
    this.spiroY =
      this.centerY +
      ((1 - this.gearRadius) * Math.sin(this.angle) -
        this.f *
          this.gearRadius *
          Math.sin((1 / this.gearRadius - 1) * this.angle)) *
        this.size
    this.mctx.strokeStyle = this.circleColor

    // plot outer circle
    this.pctx.strokeStyle = color.grey900
    this.pctx.beginPath()
    this.pctx.arc(this.centerX, this.centerY, this.size, 0, 2 * Math.PI)
    this.pctx.stroke()
    this.pctx.strokeStyle = this.spiroColor
  }

  draw() {
    if (this.hasUnmounted === false) {
      // ----------- MOVING CANVAS ----------
      // clear moving canvas
      this.mctx.clearRect(
        0,
        0,
        this.movingCanvas.width,
        this.movingCanvas.height
      )

      // gear
      this.mctx.beginPath()
      this.mctx.arc(
        this.centerX + this.gearX,
        this.centerY + this.gearY,
        this.gearRadius * this.size,
        0,
        2 * Math.PI
      )
      this.mctx.stroke()

      // inner gear
      this.mctx.beginPath()
      this.mctx.arc(
        this.centerX + this.gearX,
        this.centerY + this.gearY,
        this.f * this.gearRadius * this.size,
        0,
        2 * Math.PI
      )
      this.mctx.stroke()

      // drawing dot
      this.mctx.beginPath()
      this.mctx.arc(
        this.centerX +
          ((1 - this.gearRadius) * Math.cos(this.angle) +
            this.f *
              this.gearRadius *
              Math.cos((1 / this.gearRadius - 1) * this.angle)) *
            this.size,
        this.centerY +
          ((1 - this.gearRadius) * Math.sin(this.angle) -
            this.f *
              this.gearRadius *
              Math.sin((1 / this.gearRadius - 1) * this.angle)) *
            this.size,
        this.dotSize,
        0,
        2 * Math.PI
      )
      this.mctx.stroke()

      // ---------- PLOTTING CANVAS ----------
      //check if spirograph is incomplete
      if (this.angle - this.speed < this.N * 2 * Math.PI) {
        // pick a random color every so often
        if (Math.random() >= 0.9) {
          this.pctx.strokeStyle =
            '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
        this.pctx.beginPath()
        this.pctx.moveTo(this.spiroX, this.spiroY)
        this.spiroX =
          this.centerX +
          ((1 - this.gearRadius) * Math.cos(this.angle) +
            this.f *
              this.gearRadius *
              Math.cos((1 / this.gearRadius - 1) * this.angle)) *
            this.size
        this.spiroY =
          this.centerY +
          ((1 - this.gearRadius) * Math.sin(this.angle) -
            this.f *
              this.gearRadius *
              Math.sin((1 / this.gearRadius - 1) * this.angle)) *
            this.size
        this.pctx.lineTo(this.spiroX, this.spiroY)
        this.pctx.stroke()
      } else {
        // if completed, start new spirograph
        this.mctx.clearRect(
          0,
          0,
          this.movingCanvas.width,
          this.movingCanvas.height
        )
        this.delay(3000)
          .then(() => this.newSpirograph())
          .then(() => window.requestAnimationFrame(this.draw))

        return
      }

      // ---------- INCREMENT ----------
      this.gearX = (1 - this.gearRadius) * Math.cos(this.angle) * this.size
      this.gearY = (1 - this.gearRadius) * Math.sin(this.angle) * this.size
      this.angle += this.speed

      // draw next frame
      window.requestAnimationFrame(this.draw)
    }
  }

  render() {
    return (
      <Wrapper>
        <CanvasWrapper>
          <canvas
            ref={(plottingCanvas) => (this.plottingCanvas = plottingCanvas)}
          />
        </CanvasWrapper>
        <CanvasWrapper>
          <canvas ref={(movingCanvas) => (this.movingCanvas = movingCanvas)} />
        </CanvasWrapper>
      </Wrapper>
    )
  }
}
