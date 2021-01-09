import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import GlobalStyle from '../styles/global-style'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const PriceDisplay = styled.div`
  margin: 0.1em 0;
  font-size: 5em;
  font-style: italic;
  color: #afafaf;

  @media all and (max-width: 699px) and (min-width: 520px) {
    font-size: 5em;
  }
  @media all and (max-width: 999px) and (min-width: 700px) {
    font-size: 8em;
  }
  @media all and (min-width: 1000px) {
    font-size: 10em;
  }
`

const PriceIncrease = styled.div`
  font-size: 4em;
  color: #57c84d;
  min-height: 1.8em;
`
const PriceDecrease = styled.div`
  font-size: 1.8em;
  color: #ea4c46;
  min-height: 1.8em;
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

  const { price, priceChange } = priceData

  return (
    <Wrapper>
      <PriceIncrease>
        {priceChange > 0 && <span>+ {priceChange}</span>}
      </PriceIncrease>
      <PriceDisplay>{price}</PriceDisplay>
      <PriceDecrease>
        {priceChange < 0 && <span>- {Math.abs(priceChange)}</span>}
      </PriceDecrease>
      <GlobalStyle />
    </Wrapper>
  )
}
