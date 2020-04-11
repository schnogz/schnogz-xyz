import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LastFm from './../config/lastFm'

const Wrapper = styled.div`
  flex-direction: column;
`
const AlbumListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Header = styled.div`
  margin-bottom: 1.75rem;
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
  -webkit-box-shadow: 10px 10px 21px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 21px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 21px -5px rgba(0, 0, 0, 0.75);
`
const PlayCount = styled.div`
  background-color: white;
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

export default () => {
  const [topAlbums, setAlbumData] = useState([])
  const [current, setCurrentData] = useState({})

  useEffect(() => {
    fetch(ALBUMS_URI)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('error')
      })
      .then((data) => setAlbumData(data.topalbums.album))
      .catch(() =>
        setAlbumData({ error: 'Whoops! Something went wrong with Last.fm' })
      )
  }, [])

  useEffect(() => {
    fetch(CURRENT_URI)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('error')
      })
      .then((data) => setCurrentData(data.recenttracks))
      .catch(() =>
        setCurrentData({ error: 'Whoops! Something went wrong with Last.fm' })
      )
  }, [])

  return (
    <Wrapper>
      <Header>
        I have scrobbled {current['@attr'] && current['@attr'].total} times to{' '}
        <a
          href="https://www.last.fm/user/schnogz"
          rel="noopener noreferrer"
          target="blank"
        >
          LastFM
        </a>{' '}
        since May 8, 2011. That's about 28 songs per day on average. Here are my
        top albums from last week.
      </Header>
      <AlbumListWrapper>
        {topAlbums.map((s) => (
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
        ))}
      </AlbumListWrapper>
    </Wrapper>
  )
}
