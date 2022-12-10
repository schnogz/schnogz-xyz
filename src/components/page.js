import React from 'react'
import Helmet from 'react-helmet'

import GlobalStyle from 'styles/global-style'

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayOutlines: false,
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', (e) => this.handleKeyboardInput(e))
  }

  handleKeyboardInput(e) {
    const key = e.keyCode || e.charCode
    // Tab
    if (key === 9) {
      this.setState({ displayOutlines: true })
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <html lang='en' />
          <title>schnogz.xyz</title>
          <meta name='description' content='schnogz.xyz portfolio site' />
          <meta
            name='keywords'
            content='code, coding, javascript, ux, ui, react, node, app, photography, blog'
          />
          <meta property='og:image' content='https://www.schnogz.xyz/static/profile.jpeg' />
          <meta property='og:description' content='schnogz.xyz portfolio site' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://schnogz.xyz' />
          <meta property='og:title' content='schnogz.xyz' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
        </Helmet>
        <GlobalStyle displayOutlines={this.state.displayOutlines} />
        {this.props.children}
      </>
    )
  }
}

export default Page
