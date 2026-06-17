import React, { type ReactNode } from 'react'
import styled from 'styled-components'

import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.h2`
  border-bottom: 2px solid ${darkMode.seagreen};
  display: inline-block;
  font-size: ${fontSize.f6};
  color: ${darkMode.seagreen};
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 0 6px 0;
  padding: 0 0 16px 0;
  line-height: 1.1;
  /* layered glow on the text — accent halo, atmospheric mid, soft outer bloom */
  text-shadow:
    0 0 14px rgba(102, 252, 241, 0.7),
    0 0 32px rgba(102, 252, 241, 0.5),
    0 0 64px rgba(102, 252, 241, 0.25);
  ${media.lg`
    font-size: ${fontSize.f5};
    padding: 0 0 12px 0;
    margin: 0 0 2px 0;
  `}
  ${media.md`
    margin-bottom: 72px;
    padding-bottom: 12px;
  `}
  ${media.sm`
    margin-bottom: 32px;
    padding-bottom: 8px;
  `}
`

const SectionHeading = (props: { children: ReactNode }) => <Heading>{props.children}</Heading>

export default SectionHeading
