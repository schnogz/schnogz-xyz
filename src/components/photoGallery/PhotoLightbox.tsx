import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { type Photo } from 'components/photoGallery/usePhotos'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

type Props = {
  index: number
  onClose: () => void
  photos: Photo[]
}

const THUMBNAILS_THRESHOLD = 10

const PhotoLightbox = ({ index, onClose, photos }: Props) => {
  const open = index >= 0
  const slides = photos.map((p) => {
    return {
      alt: p.alt,
      description: p.caption,
      height: p.height,
      src: p.src,
      title: p.title,
      width: p.width,
    }
  })

  const plugins = [Zoom]
  if (photos.length >= THUMBNAILS_THRESHOLD) plugins.push(Thumbnails)

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={Math.max(0, index)}
      slides={slides}
      plugins={plugins}
      controller={{ closeOnBackdropClick: true }}
      toolbar={{ buttons: [] }}
    />
  )
}

export default PhotoLightbox
