import React from 'react'
import styled from 'styled-components'

import { color, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.h2`
  border-top: 2px solid ${color.grey900};
  display: inline-block;
  font-size: ${fontSize.f5};
  color: ${color.grey900};
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 6px 0 0 0;
  padding: 16px 0 0 0;
  line-height: 1.1;
  ${media.lg`
    font-size: ${fontSize.f4};
    padding: 12px 0 0 0;
    margin: 2px 0 0 0;
  `}
  ${media.md`
      border-top: none;
      margin-bottom: 72px;
      padding-bottom: 12px;
      border-bottom: 2px solid ${color.grey900};
    `}
  ${media.sm`
      margin-bottom: 60px;
      padding-bottom: 8px;
    `}
`

export default (props) => <Heading>{props.children}</Heading>
