import React from 'react'
import styled from 'styled-components'

import { fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const ProjectWrapper = styled.div`
  display: flex;
  margin-bottom: 100px;
  &:last-of-type {
    margin-bottom: 0;
  }
  ${media.lg`
    margin-bottom: 92px;
  `}
  ${media.sm`
    flex-wrap: wrap;
    margin-bottom: 68px;
  `}
`
const Description = styled.div`
  @media (max-width: 660px) {
    margin-top: 32px;
  }
`
const Title = styled.h3`
  font-size: ${fontSize.f6};
  font-weight: 700;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.md`
    font-size: ${fontSize.f6};
  `}
  margin: 0 0 16px 0;
`
const Logo = styled.div`
  flex: 0 0 150px;
  height: 150px;
  margin-right: 40px;
  border-radius: 8px;
  ${media.sm`
    margin-bottom: -20px;
  `}
`
const Abstract = styled.div`
  margin-bottom: 16px;
`

export default (props) => {
  const { abstract, link, logo, title } = props
  return (
    <ProjectWrapper>
      <Logo>{logo}</Logo>
      <Description>
        <Title>{title}</Title>
        <Abstract>{abstract}</Abstract>
        {link}
      </Description>
    </ProjectWrapper>
  )
}
