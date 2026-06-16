import React, { type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

import GlobalStyle from 'styles/global-style'

type PageProps = {
  children?: ReactNode
}

// reducedMotion="user" makes every framer-motion descendant honor the
// `prefers-reduced-motion: reduce` OS preference automatically
const Page = ({ children }: PageProps) => (
  <MotionConfig reducedMotion='user'>
    <GlobalStyle />
    {children}
  </MotionConfig>
)

export default Page
