import React, { type ReactNode } from 'react'

import GlobalStyle from 'styles/global-style'

type PageProps = {
  children?: ReactNode
}

const Page = ({ children }: PageProps) => (
  <>
    <GlobalStyle />
    {children}
  </>
)

export default Page
