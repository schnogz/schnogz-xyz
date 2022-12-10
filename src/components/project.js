import React from 'react'
import styled from 'styled-components'

import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
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

// TODO: get linkout to work
const Title = styled.a`
  color: ${darkMode.grey};
  font-size: ${fontSize.f6};
  font-weight: 700;
  margin: 0 0 2px;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.md`
    font-size: ${fontSize.f6};
  `}
`
const Subtitle = styled.h5`
  color: ${darkMode.seagreenDark};
  font-size: ${fontSize.f1};
  font-weight: 200;
  margin: 0 0 16px;
`
const Logo = styled.div`
  display: flex;
  flex: 0 0 150px;
  justify-content: center;
  height: 100%;
  margin-right: 40px;
  border-radius: 8px;
  ${media.md`
    justify-content: flex-start;
  `}
  ${media.sm`
    justify-content: flex-start;
    margin-bottom: -20px;
  `}
`
const Abstract = styled.p`
  margin-bottom: 16px;
`

const Project = (props) => {
  const { abstract, link, logo, subtitle, title, url } = props
  return (
    <ProjectWrapper>
      <Logo>{logo}</Logo>
      <Description>
        <Title href={url} target='_blank' rel='noreferrer'>
          {title}
        </Title>
        <Subtitle>{subtitle}</Subtitle>
        <Abstract>{abstract}</Abstract>
        {link}
      </Description>
    </ProjectWrapper>
  )
}

export default Project
