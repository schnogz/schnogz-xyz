import React from 'react'
import styled from 'styled-components'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import { color, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Heading = styled.span`
  font-size: ${fontSize.f6};
  color: ${color.grey900};
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.35;
  ${media.lg`
    font-size: ${fontSize.f5};
    letter-spacing: -0.3px;
  `}
  ${media.sm`
    font-size: ${fontSize.f5};
  `}
`

export default () => (
  <TwoColumns
    leftColumn={<SectionHeading>Who</SectionHeading>}
    rightColumn={
      <>
        <Heading>
          Hey there! I'm Andrew, a web application developer from planet Earth.
        </Heading>
        <p>
          In my work I strive to bring the ideas of people around me to life. Building modern, scalable web applications
          that are delightfully responsive down to that last pixel is what I live for.
        </p>
        <p style={{ marginBottom: 0 }}>
          Currently I'm leading development on an open source cryptocurrency wallet for{' '}
          <a href="https://blockchain.com" target="blank">Blockchain.com</a>.
        </p>
      </>
    }
  />
)
