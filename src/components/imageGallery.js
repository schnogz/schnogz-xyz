import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Gallery from '@browniebroke/gatsby-image-gallery'
import { graphql, useStaticQuery } from 'gatsby'

const ImageStyles = createGlobalStyle`
  .portfolio-image {
    height: 165px;
    width: 165px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.5);
    -moz-box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.5);
    box-shadow: 0 0 22px 4px rgba(0, 68, 139, 0.5);
  
    &:hover {
      cursor: pointer;
    }
  }
`
const PhotosIntro = styled.p`
  margin: 0.25rem 0 1.75rem;
`

const ImageGallery = () => {
  const imagesQuery = useStaticQuery(graphql`
    query MyQuery {
      allFile(filter: { relativeDirectory: { eq: "personal" } }) {
        edges {
          node {
            childImageSharp {
              thumb: fluid(maxWidth: 165, maxHeight: 165) {
                ...GatsbyImageSharpFluid
              }
              full: fluid(maxWidth: 4320, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  const images = imagesQuery.allFile.edges.map(
    ({ node }) => node.childImageSharp
  )

  return (
    <>
      <PhotosIntro>
        I am an amateur photographer focusing on landscape, street and
        astrophotography.
      </PhotosIntro>
      <Gallery
        colWidth="50"
        gutter="1rem"
        images={images}
        imgClass="portfolio-image"
        lightboxOptions={{
          animationDisabled: true,
          imagePadding: '50',
        }}
        mdColWidth="33"
      />
      <ImageStyles />
    </>
  )
}

export default ImageGallery
