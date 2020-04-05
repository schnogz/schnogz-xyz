import React from 'react'
import styled from 'styled-components'

import Icon from 'components/icons'
import { color, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 0 0 auto;
  ${media.lg`
  height: ${props => (props.article ? '64px' : '')};
  `}
  ${media.sm`
    display: ${props => (props.article ? 'flex' : 'block')};
  `};
  z-index: 10;
  height: ${props => (props.article ? '74px' : '')};
  ${media.xs`
    display: block;
    height: 112px;
  `}
`
const LogoWrapper = styled.div`
  padding: 24px 0 24px 24px;
  ${media.sm`
    padding: ${props => (props.article ? '24px 0 24px 24px' : '24px 0 0 0')};
  `};
  ${media.xs`
    padding: 24px 0 0 0;
  `}
`
const NameLink = styled.a`
  text-decoration: none;
`
const Name = styled.h1`
  white-space: nowrap;
  font-size: ${fontSize.f6};
  text-align: left;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.8px;
  ${media.sm`
    text-align: center;
    font-size: ${fontSize.f7};
  `};
`
const NameArticle = styled.div`
  white-space: nowrap;
  font-size: ${fontSize.f5};
  font-weight: 700;
  text-align: left;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.6px;
  color: ${color.grey900};
  ${media.xs`
    text-align: center;
  `};
`
const Role = styled.div`
  color: ${color.grey700};
  text-align: left;
  line-height: 1.4;
  font-size: ${fontSize.f4};
  ${media.sm`
    text-align: center;
    font-size: ${fontSize.f6};
  `};
`
const SocialLinks = styled.div`
  display: grid;
  grid-column-gap: 4px;
  grid-template-columns: auto auto auto auto;
  padding: 15px 24px 0 24px;
  ${media.sm`
    padding: ${props => (props.article ? '15px 12px 0 8px' : '4px 0 0 0')};
    grid-column-gap: 0;
  `}
  ${media.xs`
    padding: 0;
  `}
  justify-content: center;
`
const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: ${color.grey900};
  &:hover {
    background: ${color.white};
    color: ${color.grey900};
  }
  &:active {
    color: ${color.grey900};
  }
  &:visited {
    color: ${color.grey900};
  }
`
const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  color: inherit;
  background: inherit;
`
const InlineSvg = styled.svg`
  height: 24px;
  width: 24px;
  color: inherit;
  fill: currentColor;
`
const Tooltip = styled.div`
  padding: 2px 24px 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: opacity 300ms;
  ${media.sm`
    justify-content: center;
    padding-top: 6px;
  `}
`
const TooltipIcon = styled.div`
  transform: rotate(270deg);
  margin-left: 8px;
`
const TooltipText = styled.div``

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipIsVisible: false,
      tooltipText: '',
    }
  }

  showTooltip = tooltipText => {
    this.setState({
      tooltipIsVisible: true,
      tooltipText: tooltipText,
    })
  }

  hideTooltip = () => {
    this.setState({
      tooltipIsVisible: false,
    })
  }
  render() {
    return (
      <Wrapper article={this.props.article}>
        <LogoWrapper article={this.props.article}>
          {this.props.article && (
            <NameLink href="/">
              <NameArticle article={this.props.article}>
                Andrew Schneider
              </NameArticle>
            </NameLink>
          )}
          {!this.props.article && (
            <Name article={this.props.article}>Andrew Schneider</Name>
          )}
          {!this.props.article && <Role>Web Developer</Role>}
        </LogoWrapper>
        <div>
          <SocialLinks article={this.props.article}>
	          <SocialLink
		          href="http://theonist.com"
		          target="blank"
		          onMouseOver={() => this.showTooltip('Blog')}
		          onFocus={() => this.showTooltip('Blog')}
		          onMouseLeave={this.hideTooltip}
		          onBlur={this.hideTooltip}
		          aria-label="Andrew's Blog"
	          >
		          <SvgWrapper>
			          <InlineSvg>
				          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.019 10.13c-.282-.293-.268-.751.024-1.035l2.974-2.884c.145-.14.332-.211.517-.211.188 0 .375.073.518.22l-4.033 3.91zm-4.888 7.348c-.062.059-.093.139-.093.218 0 .167.136.304.304.304.076 0 .152-.029.212-.086l.499-.486-.422-.436-.5.486zm4.219-5.617l-1.71 1.657c-.918.891-1.387 1.753-1.819 2.958l.754.779c1.217-.395 2.094-.836 3.013-1.728l1.709-1.658-1.947-2.008zm4.985-5.106l-4.402 4.27 2.218 2.29 4.402-4.269c.323-.314.485-.73.485-1.146 0-1.392-1.687-2.13-2.703-1.145z" />
			          </InlineSvg>
		          </SvgWrapper>
	          </SocialLink>
	          <SocialLink
		          href="https://github.com/schnogz"
		          target="blank"
		          onMouseOver={() => this.showTooltip('GitHub')}
		          onFocus={() => this.showTooltip('GitHub')}
		          onMouseLeave={this.hideTooltip}
		          onBlur={this.hideTooltip}
		          aria-label="Andrew's GitHub profile"
	          >
		          <SvgWrapper>
			          <InlineSvg>
				          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z" />
			          </InlineSvg>
		          </SvgWrapper>
	          </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/andrewmarkschneider/"
              target="blank"
              onMouseOver={() => this.showTooltip('LinkedIn')}
              onFocus={() => this.showTooltip('LinkedIn')}
              onMouseLeave={this.hideTooltip}
              onBlur={this.hideTooltip}
              aria-label="Andrew's LinkedIn profile"
            >
              <SvgWrapper>
                <InlineSvg>
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z" />
                </InlineSvg>
              </SvgWrapper>
            </SocialLink>
	          <SocialLink
		          href="mailto:andrew.mark.schneider@gmail.com?subject=Hey Andrew!"
		          target="blank"
		          onMouseOver={() => this.showTooltip('Email')}
		          onFocus={() => this.showTooltip('Email')}
		          onMouseLeave={this.hideTooltip}
		          onBlur={this.hideTooltip}
		          aria-label="Send an email to Andrew"
	          >
		          <SvgWrapper>
			          <InlineSvg>
				          <path d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55l-5.992-4.57h11.983l-5.991 4.57zm0 1.288l-6-4.629v6.771h12v-6.771l-6 4.629z" />
			          </InlineSvg>
		          </SvgWrapper>
	          </SocialLink>
          </SocialLinks>
          {!this.props.article && (
            <Tooltip
              visible={this.state.tooltipIsVisible}
              article={this.props.article}
            >
              <TooltipText>{this.state.tooltipText}</TooltipText>
              <TooltipIcon>
                <Icon glyph="arrow" size={24} />
              </TooltipIcon>
            </Tooltip>
          )}
        </div>
      </Wrapper>
    )
  }
}

export default Header
