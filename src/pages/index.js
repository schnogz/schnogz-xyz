import React from 'react'
import loadable from '@loadable/component'

import Footer from 'components/footer'
import Hero from 'components/hero'
import Page from 'components/page'
import ScrollHelper from 'components/scrollHelper'
import Section from 'components/section'

// lazy loaded content
const Hello = loadable(() => import('./../content/hello'))
const Experience = loadable(() => import('./../content/experience'))
const Stats = loadable(() => import('./../content/stats'))
const Projects = loadable(() => import('./../content/projects'))

const SinglePage = () => (
  <Page>
    <Hero />
    <Section id='hello'>
      <Hello />
    </Section>
    <Section id='stats'>
      <Stats />
    </Section>
    <Section id='projects'>
      <Projects />
    </Section>
    <Section id='experience'>
      <Experience />
    </Section>
    <Footer />
    <ScrollHelper />
  </Page>
)

export default SinglePage
