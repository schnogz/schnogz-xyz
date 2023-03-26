import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

import Page from 'components/page'

const Iframe = styled.iframe`
  width: '330px';
  height: ${() => (isMobile ? '100%' : '650px')};
`

const Dispatch = () => (
  <Page>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Iframe
        src='https://sdk-staging.dispatch.xyz/?source=schnogz&useAdsServer=true'
        frameBorder='0'
        width='330'
        height='625'
      ></Iframe>
    </div>
  </Page>
)

export default Dispatch
