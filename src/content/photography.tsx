import React, { lazy, Suspense, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { PhotoHomePreview } from 'components/photoGallery/PhotoGrid'
import usePhotos from 'components/photoGallery/usePhotos'
import SectionHeading from 'components/sectionHeading'
import TwoColumns from 'components/twoColumns'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

// lazy-loaded — the lightbox pulls in @floating-ui/react which doesn't SSR
const PhotoLightbox = lazy(() => import('components/photoGallery/PhotoLightbox'))

const PREVIEW_COUNT = 4

const Heading = styled.span`
  font-size: ${fontSize.f6};
  color: ${darkMode.white};
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.35;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.sm`
    font-size: ${fontSize.f5};
  `}
`

const Intro = styled.p`
  margin: 0.5rem 0 1.5rem;
`

const EmptyState = styled.p`
  color: ${darkMode.greyDark};
  font-style: italic;
`

const Emoji = styled.span`
  font-size: 1.8rem;
  margin-left: 12px;
`

const Photography = () => {
  const allPhotos = usePhotos()
  const preview = allPhotos.slice(0, PREVIEW_COUNT)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  return (
    <TwoColumns
      wide
      leftColumn={<SectionHeading>Photography</SectionHeading>}
      rightColumn={
        <>
          <Heading>
            Out in the Wild
            <Emoji>
              <span role='img' aria-label='camera emojii'>
                📸
              </span>
            </Emoji>
          </Heading>
          <Intro>
            Moments I&apos;ve frozen from a world worth exploring. Check out my{' '}
            <Link to='/photography/'>full gallery</Link>.
          </Intro>
          {preview.length === 0 ? (
            <EmptyState>
              Gallery is empty — drop some photos into <code>src/photos/</code>.
            </EmptyState>
          ) : (
            <>
              <PhotoHomePreview photos={preview} onPhotoClick={setLightboxIndex} />
              {lightboxIndex >= 0 && (
                <Suspense fallback={null}>
                  <PhotoLightbox
                    photos={preview}
                    index={lightboxIndex}
                    onClose={() => setLightboxIndex(-1)}
                  />
                </Suspense>
              )}
            </>
          )}
        </>
      }
    />
  )
}

export default Photography
