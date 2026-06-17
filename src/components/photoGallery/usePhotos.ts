import { graphql, useStaticQuery } from 'gatsby'
import { getSrc, type IGatsbyImageData } from 'gatsby-plugin-image'

import photosMeta from 'content/photos-meta.json'

export type PhotoExif = {
  aperture: number
  camera: string
  focalLength: number
  iso: number
  shutter: string
}

type PhotoMeta = {
  alt?: string
  caption?: string
  date?: string
  exif?: PhotoExif
  filename: string
  title?: string
}

export type Photo = {
  alt: string
  caption: string
  date?: string
  exif?: PhotoExif
  filename: string
  // intrinsic dims of the source image — used by react-photo-album for aspect-ratio layout
  height: number
  // largest-size src URL — used as the lightbox slide and as react-photo-album's `src` field
  src: string
  thumbImage: IGatsbyImageData
  title: string
  width: number
}

type Node = {
  base: string
  childImageSharp: {
    fullsize: IGatsbyImageData
    original: { height: number; width: number }
    thumb: IGatsbyImageData
  }
}

type QueryResult = {
  allFile: { nodes: Node[] }
}

const titleFromFilename = (filename: string) =>
  filename
    .replace(/\.[^.]+$/, '') // strip extension
    .replace(/^\d+[-_]/, '') // strip leading "01-" / "01_" curation prefix
    .replace(/[-_]/g, ' ') // dashes / underscores → spaces
    .replace(/\b\w/g, (c) => c.toUpperCase())

const usePhotos = (): Photo[] => {
  const data = useStaticQuery<QueryResult>(graphql`
    query AllPhotos {
      allFile(
        filter: {
          sourceInstanceName: { eq: "photos" }
          extension: { in: ["jpg", "jpeg", "png", "webp"] }
        }
        sort: { name: ASC }
      ) {
        nodes {
          base
          childImageSharp {
            original {
              height
              width
            }
            thumb: gatsbyImageData(
              layout: CONSTRAINED
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            fullsize: gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)

  const metaByFilename = new Map((photosMeta as PhotoMeta[]).map((m) => [m.filename, m] as const))

  return data.allFile.nodes.map((node) => {
    const meta: Partial<PhotoMeta> = metaByFilename.get(node.base) ?? {}
    const derivedTitle = titleFromFilename(node.base)
    const { fullsize, original, thumb } = node.childImageSharp
    return {
      alt: meta.alt ?? meta.title ?? derivedTitle,
      caption: meta.caption ?? '',
      date: meta.date,
      exif: meta.exif,
      filename: node.base,
      height: original.height,
      src: getSrc(fullsize) ?? '',
      thumbImage: thumb,
      title: meta.title ?? derivedTitle,
      width: original.width,
    }
  })
}

export default usePhotos
