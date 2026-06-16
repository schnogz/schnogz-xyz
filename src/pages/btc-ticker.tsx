import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import SiteHead from 'components/head'
import GlobalStyle from 'styles/global-style'

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
  margin: 0.08em 0;
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
  font-size: 4.25em;
  color: #57c84d;
  min-height: 1.8em;
`
const PriceDecrease = styled.div`
  font-size: 4.25em;
  color: #ea4c46;
  min-height: 1.8em;
`

type PriceData = {
  price: string | number
  priceChange: number
}

type BinanceTradeMessage = {
  p: string
}

let ws: WebSocket
const connectWebsocket = (setPriceData: (data: PriceData) => void) => {
  ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
  let throttle = false
  let lastPrice = 0

  ws.onmessage = (event: MessageEvent<string>) => {
    if (!throttle) {
      throttle = true
      const message = JSON.parse(event.data) as BinanceTradeMessage
      const formattedPrice = Number.parseFloat(message.p).toFixed(2)
      setPriceData({
        price: formattedPrice,
        priceChange: Number.parseFloat(((lastPrice - Number(formattedPrice)) * -1).toFixed(2)),
      })
      lastPrice = Number(formattedPrice)
      setTimeout(() => {
        throttle = false
      }, 10000)
    }
  }

  ws.onclose = () => {
    setTimeout(() => {
      connectWebsocket(setPriceData)
    }, 10000)
  }

  ws.onerror = () => {
    setTimeout(() => {
      connectWebsocket(setPriceData)
    }, 10000)
  }
}

const BtcTicker = () => {
  const [priceData, setPriceData] = useState<PriceData>({
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
      <PriceIncrease>{priceChange > 0 && <span>+ {priceChange}</span>}</PriceIncrease>
      <PriceDisplay>{price}</PriceDisplay>
      <PriceDecrease>{priceChange < 0 && <span>- {Math.abs(priceChange)}</span>}</PriceDecrease>
      <GlobalStyle />
    </Wrapper>
  )
}

export default BtcTicker

export const Head = () => (
  <SiteHead title='BTC ticker — schnogz.xyz' description='Realtime Bitcoin price.' />
)
