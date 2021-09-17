import React from 'react'
import styled from 'styled-components'

export const InlineSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: inherit;
  fill: currentColor;
`

export const SvgWrapper = styled.div`
  display: inline-block;
  flex: 0 0 ${(props) => (props.size ? `${props.size}px` : '32px')};
  width: ${(props) => (props.size ? `${props.size}px` : '32px')};
  height: ${(props) => (props.size ? `${props.size}px` : '32px')};
  min-width: ${(props) => (props.size ? `${props.size}px` : '32px')};
  min-height: ${(props) => (props.size ? `${props.size}px` : '32px')};
  position: relative;
  color: inherit;
`

export const Glyph = ({ glyph }) => {
  switch (glyph) {
    case 'arrow':
      return (
        <path
          d="m17.2418941 24.3664442-1.4379826-1.4193075 5.9200062-5.9200063h-15.33225596v-2.0542608h15.33225596l-5.9200062-5.90133121 1.4379826-1.43798259 8.3664442 8.3664442z"
          transform="matrix(0 1 -1 0 32 0)"
        />
      )
    default:
  }
}

const Icons = (props) => {
  const { size = 32, glyph } = props
  return (
    <SvgWrapper size={size} className={'icon'}>
      <InlineSvg
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        viewBox="0 0 32 32"
        preserveAspectRatio="xMidYMid meet"
        fit
        id={glyph}
      >
        <title id="title">{glyph}</title>
        <Glyph glyph={glyph} />
      </InlineSvg>
    </SvgWrapper>
  )
}

export default Icons
