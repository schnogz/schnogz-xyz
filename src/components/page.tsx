import React, { type ReactNode } from 'react'

import GlobalStyle from 'styles/global-style'

type PageProps = {
  children?: ReactNode
}

type PageState = {
  displayOutlines: boolean
}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props)
    this.state = {
      displayOutlines: false,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => this.handleKeyboardInput(e))
  }

  handleKeyboardInput(e: KeyboardEvent) {
    const key = e.keyCode || e.charCode
    // Tab
    if (key === 9) {
      this.setState({ displayOutlines: true })
    }
  }

  render() {
    return (
      <>
        <GlobalStyle displayOutlines={this.state.displayOutlines} />
        {this.props.children}
      </>
    )
  }
}

export default Page
