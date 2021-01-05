import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import GlobalStyle from '../styles/global-style'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  font-style: italic;
  color: ${(props) => (props.priceChange ? 'red' : 'green')};
  height: 100%;
  width: 100%;

  @media all and (max-width: 699px) and (min-width: 520px) {
    font-size: 7em;
  }
  @media all and (max-width: 999px) and (min-width: 700px) {
    font-size: 10em;
  }
  @media all and (min-width: 1000px) {
    font-size: 12em;
  }
`

const connectWebsocket = (setPrice, setPriceChange) => {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
  let throttle = false
  let lastPrice = 0

  ws.onmessage = (event) => {
    if (!throttle) {
      throttle = true
      const message = JSON.parse(event.data)
      const formattedPrice = Number.parseFloat(message.p).toFixed(2)
      console.log(lastPrice - formattedPrice)
      setPriceChange(lastPrice >= formattedPrice)
      setPrice(formattedPrice)
      lastPrice = formattedPrice
      setTimeout(() => {
        throttle = false
      }, 5000)
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
  const [price, setPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(false)
  useEffect(() => {
    connectWebsocket(setPrice, setPriceChange)
  }, [])
  return (
    <>
      <Wrapper priceChange={priceChange}>{price !== 0 && price}</Wrapper>
      <GlobalStyle />
    </>
  )
}
