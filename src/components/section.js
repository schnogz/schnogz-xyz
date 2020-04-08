import React from 'react'
import styled from 'styled-components'

import { color } from 'styles/theme'
import media from 'utils/media-queries'

const Section = styled.section`
  margin: 0 96px;
  ${media.lg`
    margin: 0 40px;
  `}
  ${media.sm`
    margin: 0 24px;
  `}
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  border-top: 1px solid ${color.grey400};
  max-width: 916px;
  padding: ${(props) => (props.paddingSmall ? '42px 0' : '128px 0')};
  ${media.lg`
    padding: padding: ${(props) => (props.paddingSmall ? '42px 0' : '112px 0')};
  `}
  ${media.sm`
    padding: padding: ${(props) => (props.paddingSmall ? '10px 0' : '64px 0')};
  `}
  width: 100%;
`

export default (props) => {
  const { children, id, paddingSmall } = props
  return (
    <Section id={id}>
      <Container paddingSmall={paddingSmall}>{children}</Container>
    </Section>
  )
}
