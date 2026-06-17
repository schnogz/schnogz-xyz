import React, { lazy, Suspense, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import SiteHead from 'components/head'
import Page from 'components/page'
import PhotoGrid from 'components/photoGallery/PhotoGrid'
import usePhotos from 'components/photoGallery/usePhotos'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

// lazy-loaded — the lightbox pulls in @floating-ui/react which doesn't SSR
const PhotoLightbox = lazy(() => import('components/photoGallery/PhotoLightbox'))

const Wrapper = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 64px 40px 96px;
  ${media.sm`
    padding: 32px 16px 48px;
  `}
`

const Title = styled.h1`
  color: ${darkMode.seagreen};
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  color: ${darkMode.grey};
  font-size: ${fontSize.f4};
  margin-bottom: 32px;
`

const BackLink = styled.p`
  margin-top: 32px;
  font-size: ${fontSize.f3};
`

const EmptyState = styled.p`
  color: ${darkMode.greyDark};
  font-style: italic;
`

const PhotographyPage = () => {
  const photos = usePhotos()
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <Page>
      <Wrapper>
        <Title>Photography</Title>
        <Subtitle>The full collection.</Subtitle>
        {photos.length === 0 ? (
          <EmptyState>
            Gallery is empty — drop some photos into <code>src/photos/</code>.
          </EmptyState>
        ) : (
          <PhotoGrid photos={photos} onPhotoClick={setLightboxIndex} />
        )}
        {lightboxIndex >= 0 && (
          <Suspense fallback={null}>
            <PhotoLightbox
              photos={photos}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(-1)}
            />
          </Suspense>
        )}
        <BackLink>
          <Link to='/#photography'>← Back to portfolio</Link>
        </BackLink>
      </Wrapper>
    </Page>
  )
}

export default PhotographyPage

export const Head = () => (
  <SiteHead title='Photography — schnogz.xyz' description='Photography by Andrew Schneider.' />
)
