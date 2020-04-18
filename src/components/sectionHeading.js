import React from 'react'
import styled from 'styled-components'

import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.h2`
  border-top: 2px solid ${darkMode.seagreen};
  display: inline-block;
  font-size: ${fontSize.f6};
  color: ${darkMode.seagreen};
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 6px 0 0 0;
  padding: 16px 0 0 0;
  line-height: 1.1;
  ${media.lg`
    font-size: ${fontSize.f5};
    padding: 12px 0 0 0;
    margin: 2px 0 0 0;
  `}
  ${media.md`
      border-top: none;
      margin-bottom: 72px;
      padding-bottom: 12px;
      border-bottom: 2px solid ${darkMode.seagreen};
    `}
  ${media.sm`
      margin-bottom: 60px;
      padding-bottom: 8px;
    `}
`

export default (props) => <Heading>{props.children}</Heading>
