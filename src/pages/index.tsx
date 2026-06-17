import React from 'react'

import Footer from 'components/footer'
import SiteHead from 'components/head'
import Hero from 'components/hero'
import Page from 'components/page'
import ScrollHelper from 'components/scrollHelper'
import Section from 'components/section'
import Experience from 'content/experience'
import Hello from 'content/hello'
import Photography from 'content/photography'
import Projects from 'content/projects'
import Stats from 'content/stats'

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
    <Section id='photography'>
      <Photography />
    </Section>
    <Section id='experience'>
      <Experience />
    </Section>
    <Footer />
    <ScrollHelper />
  </Page>
)

export default SinglePage

export const Head = () => <SiteHead includePersonSchema />
