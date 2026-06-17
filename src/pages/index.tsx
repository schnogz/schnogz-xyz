import React from 'react'

import Footer from 'components/footer'
import SiteHead from 'components/head'
import Hero from 'components/hero'
import Page from 'components/page'
import ScrollHelper from 'components/scrollHelper'
import Section from 'components/section'
import Coding from 'content/coding'
import Experience from 'content/experience'
import Hello from 'content/hello'
import Music from 'content/music'
import Photography from 'content/photography'
import Projects from 'content/projects'

const SinglePage = () => (
  <Page>
    <Hero />
    <Section id='hello'>
      <Hello />
    </Section>
    <Section id='experience'>
      <Experience />
    </Section>
    <Section id='projects'>
      <Projects />
    </Section>
    <Section id='coding'>
      <Coding />
    </Section>
    <Section id='music'>
      <Music />
    </Section>
    <Section id='photography'>
      <Photography />
    </Section>
    <Footer />
    <ScrollHelper />
  </Page>
)

export default SinglePage

export const Head = () => <SiteHead includePersonSchema />
