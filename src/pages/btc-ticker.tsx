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

const WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade'
const THROTTLE_MS = 10_000
const RECONNECT_MS = 10_000

const BtcTicker = () => {
  const [priceData, setPriceData] = useState<PriceData>({
    price: 0,
    priceChange: 0,
  })

  useEffect(() => {
    let ws: WebSocket | null = null
    let throttleTimer: ReturnType<typeof setTimeout> | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null
    let cancelled = false
    let throttled = false
    let lastPrice = 0

    const scheduleReconnect = () => {
      if (cancelled) return
      reconnectTimer = setTimeout(connect, RECONNECT_MS)
    }

    function connect() {
      if (cancelled) return
      ws = new WebSocket(WS_URL)

      ws.onmessage = (event: MessageEvent<string>) => {
        if (throttled) return
        throttled = true
        const message = JSON.parse(event.data) as BinanceTradeMessage
        const formattedPrice = Number.parseFloat(message.p).toFixed(2)
        setPriceData({
          price: formattedPrice,
          priceChange: Number.parseFloat(((lastPrice - Number(formattedPrice)) * -1).toFixed(2)),
        })
        lastPrice = Number(formattedPrice)
        throttleTimer = setTimeout(() => {
          throttled = false
        }, THROTTLE_MS)
      }

      ws.onclose = scheduleReconnect
      ws.onerror = scheduleReconnect
    }

    connect()

    return () => {
      cancelled = true
      if (throttleTimer !== null) clearTimeout(throttleTimer)
      if (reconnectTimer !== null) clearTimeout(reconnectTimer)
      if (ws !== null) {
        // null out handlers so close() doesn't trigger a reconnect on the way out
        ws.onclose = null
        ws.onerror = null
        ws.close()
      }
    }
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
