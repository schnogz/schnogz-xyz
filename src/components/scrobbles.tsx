import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import LastFm from 'config/lastFm'
import { darkMode } from 'styles/theme'

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

type LastFmAlbum = {
  artist: { name: string }
  image: Array<{ '#text': string }>
  name: string
  playcount: string
}

type AlbumsState = LastFmAlbum[] | { error: true }
type CurrentState = { '@attr'?: { total: string } } | { error: true }

const ALBUMS_URI = `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${LastFm.name}&api_key=${LastFm.apiKey}&limit=6&period=7day&format=json`
const CURRENT_URI = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LastFm.name}&api_key=${LastFm.apiKey}&limit=1&format=json`

// first LastFM scrobble — anchor for the per-day average
const START_DATE = new Date('2011-05-08')
const MS_PER_DAY = 86_400_000

const calcAverage = (totalScrobbles = 1) => {
  const daysSinceStart = Math.round((Date.now() - START_DATE.getTime()) / MS_PER_DAY)
  return (totalScrobbles / daysSinceStart).toFixed(2)
}

const fetchJsonOr = async <T,>(
  url: string,
  onSuccess: (data: T) => void,
  onError: () => void,
  isCancelled: () => boolean,
) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('not ok')
    const data = (await response.json()) as T
    if (!isCancelled()) onSuccess(data)
  } catch {
    if (!isCancelled()) onError()
  }
}

type TopAlbumsResponse = { topalbums: { album: LastFmAlbum[] } }
type RecentTracksResponse = { recenttracks: { '@attr'?: { total: string } } }

const Scrobbles = () => {
  const [topAlbums, setAlbumData] = useState<AlbumsState>([])
  const [current, setCurrentData] = useState<CurrentState>({})
  const totalScrobbles = ('@attr' in current && current['@attr']?.total) || '1'
  const totalScrobblesFormatted = new Intl.NumberFormat(navigator.language).format(
    Number(totalScrobbles),
  )

  useEffect(() => {
    let cancelled = false
    const isCancelled = () => cancelled

    void fetchJsonOr<TopAlbumsResponse>(
      ALBUMS_URI,
      (data) => setAlbumData(data.topalbums.album),
      () => setAlbumData({ error: true }),
      isCancelled,
    )
    void fetchJsonOr<RecentTracksResponse>(
      CURRENT_URI,
      (data) => setCurrentData(data.recenttracks),
      () => setCurrentData({ error: true }),
      isCancelled,
    )

    return () => {
      cancelled = true
    }
  }, [])

  if ('error' in topAlbums) {
    return (
      <Wrapper>
        <Header>Damn! I failed to fetch my own music listening history from LastFM.</Header>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header>
        I have scrobbled {totalScrobblesFormatted} times to{' '}
        <a href='https://www.last.fm/user/schnogz' rel='noopener noreferrer' target='_blank'>
          LastFM
        </a>{' '}
        since May 8, 2011. That&apos;s an average of {calcAverage(Number(totalScrobbles))} songs per
        day. Here are my top albums from last week.
      </Header>
      <AlbumListWrapper>
        {topAlbums.map((s) => (
          <Album key={s.name}>
            <CoverWrapper>
              <AlbumCover
                src={s.image[3]['#text']}
                alt={s.name + 'album cover'}
                width={160}
                height={160}
                loading='lazy'
                decoding='async'
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

export default Scrobbles
