import React, { type ReactNode } from 'react'
import styled from 'styled-components'

import media from 'utils/media-queries'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  justify-content: space-between;
  width: 100%;
  ${media.md`
    grid-template-columns: auto;
    justify-content: center;
  `}
`

const LeftColumn = styled.div``

const RightColumn = styled.div<{ wide?: boolean }>`
  max-width: ${(props) => (props.wide ? '620px' : '544px')};
  ${media.md`
    max-width: 544px;
  `}
`

type TwoColumnsProps = {
  leftColumn: ReactNode
  rightColumn: ReactNode
  wide?: boolean
}

const TwoColumns = (props: TwoColumnsProps) => {
  const { leftColumn, rightColumn, wide } = props
  return (
    <Wrapper>
      <LeftColumn>{leftColumn}</LeftColumn>
      <RightColumn wide={wide}>{rightColumn}</RightColumn>
    </Wrapper>
  )
}

export default TwoColumns
