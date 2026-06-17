import React from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { type Photo } from 'components/photoGallery/usePhotos'

import 'react-photo-album/rows.css'

type Props = {
  onPhotoClick: (index: number) => void
  photos: Photo[]
}

// 2×2 (or 2×3) CSS-grid layout used for the home-page preview — uniform tiles
const HomePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

const PreviewTile = styled.button`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  aspect-ratio: 3 / 2;
  transition: transform 200ms ease;
  &:hover,
  &:focus-visible {
    transform: scale(1.02);
  }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  /* force the GatsbyImage wrapper to fill the tile so the inner <img> can crop via object-fit */
  .gatsby-image-wrapper,
  .gatsby-image-wrapper > div {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
  }
  .gatsby-image-wrapper img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }
`

type HomePreviewProps = {
  onPhotoClick: (index: number) => void
  photos: Photo[]
}

export const PhotoHomePreview = ({ onPhotoClick, photos }: HomePreviewProps) => (
  <HomePreviewGrid>
    {photos.map((photo, index) => (
      <PreviewTile
        key={photo.filename}
        onClick={() => onPhotoClick(index)}
        aria-label={`View ${photo.title}`}
      >
        <GatsbyImage image={photo.thumbImage} alt={photo.alt} />
      </PreviewTile>
    ))}
  </HomePreviewGrid>
)

// Justified "Google Photos"-style layout used on the full /photography page — preserves aspect ratios
const PhotoGrid = ({ onPhotoClick, photos }: Props) => (
  <RowsPhotoAlbum
    photos={photos}
    onClick={({ index }) => onPhotoClick(index)}
    targetRowHeight={280}
    spacing={8}
    render={{
      image: (_, { photo }) => <GatsbyImage image={photo.thumbImage} alt={photo.alt} />,
    }}
  />
)

export default PhotoGrid
