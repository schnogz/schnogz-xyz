import React from 'react'

import Page from 'components/page'
import Hero from 'components/hero'
import Section from 'components/section'
import Footer from 'components/footer'
import Who from 'content/who'
import Where from 'content/where'
import Why from 'content/why'
import When from 'content/when'

export default class App extends React.Component {
  render() {
    return (
      <Page>
        <Hero />
        <Section id={'who'}>
          <Who />
        </Section>
        <Section id={'where'}>
          <Where />
        </Section>
        <Section id={'when'}>
          <When />
        </Section>
        <Section id={'why'}>
          <Why />
        </Section>
        <Footer />
      </Page>
    )
  }
}
