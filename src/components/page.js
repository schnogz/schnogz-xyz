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
          <html lang="en" />
          <title>Andrew Schneider (Schnogz)</title>
          <meta
            name="description"
            content="Andrew Schneider's personal website"
          />
          <meta
            name="keywords"
            content="code, coding, javascript, ux, ui, react, node, app, photography, blog"
          />
          <meta
            property="og:image"
            content="https://www.schnogz.com/static/profile.jpeg"
          />
          <meta
            property="og:description"
            content="Andrew Schneider's personal website"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://schnogz.com" />
          <meta property="og:title" content="Andrew Schneider" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <GlobalStyle displayOutlines={this.state.displayOutlines} />
        {this.props.children}
      </>
    )
  }
}

export default Page
