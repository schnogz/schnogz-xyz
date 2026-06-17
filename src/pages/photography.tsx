import React, { lazy, Suspense, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Footer from 'components/footer'
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

const TitleRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`

const HeaderBackLink = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSize.f3};
  white-space: nowrap;
`

const Title = styled.h1`
  border-bottom: 2px solid ${darkMode.seagreen};
  display: inline-block;
  color: ${darkMode.seagreen};
  font-size: ${fontSize.f10};
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin: 0;
  padding: 0 0 16px 0;
  line-height: 1.1;
  /* same neon glow stack used by SectionHeading */
  text-shadow:
    0 0 14px rgba(102, 252, 241, 0.7),
    0 0 32px rgba(102, 252, 241, 0.5),
    0 0 64px rgba(102, 252, 241, 0.25);
  ${media.lg`
    font-size: ${fontSize.f9};
  `}
  ${media.sm`
    font-size: ${fontSize.f8};
    letter-spacing: 3px;
  `}
`

const Subtitle = styled.p`
  color: ${darkMode.white};
  font-size: ${fontSize.f4};
  margin: 20px 0 40px;
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
        <TitleRow>
          <Title>Photography</Title>
          <HeaderBackLink>
            <Link to='/#photography'>← Back to portfolio</Link>
          </HeaderBackLink>
        </TitleRow>
        <Subtitle>Moments frozen in time from a world worth exploring.</Subtitle>
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
      </Wrapper>
      <Footer />
    </Page>
  )
}

export default PhotographyPage

export const Head = () => (
  <SiteHead title='Photography — schnogz.xyz' description='Photography by Andrew Schneider.' />
)
