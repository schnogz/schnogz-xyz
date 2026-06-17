import React from 'react'
import styled from 'styled-components'
import Lightbox, { type Slide } from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { type Photo, type PhotoExif } from 'components/photoGallery/usePhotos'

import 'yet-another-react-lightbox/styles.css'

type ExifSlide = Slide & { exif?: PhotoExif }

const ExifRow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 60px 16px 24px;
  /* soft gradient fades in from transparent so badges stay readable over any photo */
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  pointer-events: none;
`

const ExifBadge = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  white-space: nowrap;
`

const ExifLabel = styled.span`
  color: rgba(102, 252, 241, 0.85);
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

type ExifDisplayProps = { exif?: PhotoExif }

const ExifDisplay = ({ exif }: ExifDisplayProps) => {
  if (!exif) return null
  return (
    <ExifRow>
      <ExifBadge>
        <ExifLabel>focal</ExifLabel>
        {exif.focalLength}mm
      </ExifBadge>
      <ExifBadge>
        <ExifLabel>aperture</ExifLabel>f/{exif.aperture}
      </ExifBadge>
      <ExifBadge>
        <ExifLabel>shutter</ExifLabel>
        {exif.shutter}
      </ExifBadge>
      <ExifBadge>
        <ExifLabel>iso</ExifLabel>
        {exif.iso}
      </ExifBadge>
    </ExifRow>
  )
}

type Props = {
  index: number
  onClose: () => void
  photos: Photo[]
}

const PhotoLightbox = ({ index, onClose, photos }: Props) => {
  const open = index >= 0
  const slides: ExifSlide[] = photos.map((p) => {
    return {
      alt: p.alt,
      exif: p.exif,
      height: p.height,
      src: p.src,
      title: p.title,
      width: p.width,
    }
  })

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={Math.max(0, index)}
      slides={slides}
      plugins={[Zoom]}
      controller={{ closeOnBackdropClick: true }}
      toolbar={{ buttons: [] }}
      render={{
        slideFooter: ({ slide }) => <ExifDisplay exif={(slide as ExifSlide).exif} />,
      }}
    />
  )
}

export default PhotoLightbox
