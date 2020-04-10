import loadable from '@loadable/component'
import React from 'react'

import Page from 'components/page'
import Hero from 'components/hero'
import Section from 'components/section'
import Footer from 'components/footer'

// lazy loaded content
const Who = loadable(() => import('./../content/who'))
const Where = loadable(() => import('./../content/where'))
const Why = loadable(() => import('./../content/why'))
const When = loadable(() => import('./../content/when'))

export default () => (
  <Page>
    <Hero />
    <Section id="who">
      <Who />
    </Section>
    <Section id="where">
      <Where />
    </Section>
    <Section id="when">
      <When />
    </Section>
    <Section id="why">
      <Why />
    </Section>
    <Footer />
  </Page>
)
