import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// import ParallaxItem from './parallaxItem/index'
import LastFm from './../config/lastFm'
import { darkMode } from '../styles/theme'

const Wrapper = styled.div`
  flex-direction: column;
`
const AlbumListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Header = styled.p`
  margin-bottom: 2rem;
`
const Album = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 32%;
  min-width: 160px;
  margin-bottom: 4%;
`
const CoverWrapper = styled.div`
  position: relative;
  height: 160px;
  width: 160px;
  margin-bottom: 14px;
`
const AlbumCover = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 2px;
  -webkit-box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.75);
  -moz-box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.75);
  box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.75);
`
const PlayCount = styled.div`
  background-color: white;
  color: ${darkMode.greyDark};
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 3px;
  border-top-left-radius: 1px;
  border-bottom-right-radius: 2px;
  line-height: 0.6rem;
`
const Text = styled.div`
  font-size: 0.85rem;
`
const TextBold = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
`

const ALBUMS_URI = `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${LastFm.name}&api_key=${LastFm.apiKey}&limit=6&period=7day&format=json`
const CURRENT_URI = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LastFm.name}&api_key=${LastFm.apiKey}&limit=1&format=json`

const calcAverage = (totalScrobbles = 1) => {
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const startDate = new Date(2011, 5, 8) // May 8, 2011
  const daysSinceStart = Math.round(Math.abs((startDate - new Date()) / oneDay))
  return (totalScrobbles / daysSinceStart).toFixed(2)
}

const Scrobbles = () => {
  const [topAlbums, setAlbumData] = useState([])
  const [current, setCurrentData] = useState({})
  const totalScrobbles = (current['@attr'] && current['@attr'].total) || 1
  const totalScrobblesFormatted = new Intl.NumberFormat(
    navigator.language
  ).format(totalScrobbles)

  useEffect(() => {
    fetch(ALBUMS_URI)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('error')
      })
      .then((data) => setAlbumData(data.topalbums.album))
      .catch(() => setAlbumData({ error: true }))
  }, [])

  useEffect(() => {
    fetch(CURRENT_URI)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('error')
      })
      .then((data) => setCurrentData(data.recenttracks))
      .catch(() => setCurrentData({ error: true }))
  }, [])

  if (topAlbums.error || topAlbums.current) {
    return (
      <Wrapper>
        <Header>
          Damn! I failed to fetch my own music listening history from LastFM.
        </Header>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header>
        I have scrobbled {totalScrobblesFormatted} times to{' '}
        <a
          href="https://www.last.fm/user/schnogz"
          rel="noopener noreferrer"
          target="blank"
        >
          LastFM
        </a>{' '}
        since May 8, 2011. That's an average of {calcAverage(totalScrobbles)}{' '}
        songs per day. Here are my top albums from last week.
      </Header>
      <AlbumListWrapper>
        {topAlbums.map((s) => (
          // <ParallaxItem key={s.name}>
          <Album>
            <CoverWrapper>
              <AlbumCover
                src={s.image[3]['#text']}
                alt={s.name + 'album cover'}
              />
              <PlayCount>{s.playcount} spins</PlayCount>
            </CoverWrapper>
            <TextBold>{s.name}</TextBold>
            <Text>{s.artist.name}</Text>
          </Album>
          // </ParallaxItem>
        ))}
      </AlbumListWrapper>
    </Wrapper>
  )
}

export default Scrobbles
