import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import GlobalStyle from '../styles/global-style'

const updateColor = (priceChange) => keyframes`
   0% { color: ${priceChange < 0 ? '#DC1C13' : '#2EB62C'} }
   25% { color: ${priceChange < 0 ? '#EA4C46' : '#57C84D'} }
   50% { color: ${priceChange < 0 ? '#F07470' : '#83D475'} }
   75% { color: ${priceChange < 0 ? '#F1959B' : '#ABE098'} }
   100% { color: #AFAFAF }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  font-style: italic;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: #afafaf;
  animation: ${({ priceChange }) => updateColor(priceChange)} 4s linear;

  @media all and (max-width: 699px) and (min-width: 520px) {
    font-size: 5.5em;
  }
  @media all and (max-width: 999px) and (min-width: 700px) {
    font-size: 8.5em;
  }
  @media all and (min-width: 1000px) {
    font-size: 10em;
  }
`

let ws
const connectWebsocket = (setPriceData) => {
  ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
  let throttle = false
  let lastPrice = 0

  ws.onmessage = (event) => {
    if (!throttle) {
      throttle = true
      const message = JSON.parse(event.data)
      const formattedPrice = Number.parseFloat(message.p).toFixed(2)
      setPriceData({
        price: formattedPrice,
        priceChange: Number.parseFloat(
          ((lastPrice - formattedPrice) * -1).toFixed(2)
        ),
      })
      lastPrice = formattedPrice
      setTimeout(() => {
        throttle = false
      }, 10000)
    }
  }

  ws.onclose = () => {
    setTimeout(() => {
      connectWebsocket()
    }, 10000)
  }

  ws.onerror = () => {
    setTimeout(() => {
      connectWebsocket()
    }, 10000)
  }
}

export default () => {
  const [priceData, setPriceData] = useState({
    price: 0,
    priceChange: 0,
  })
  useEffect(() => {
    connectWebsocket(setPriceData)
    return () => ws.close()
  }, [])

  return (
    <>
      <Wrapper priceChange={priceData.priceChange}>{priceData.price}</Wrapper>
      <GlobalStyle />
    </>
  )
}
