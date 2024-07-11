import React from 'react'
import { FiBookOpen, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import Icon from 'components/icons'
import { darkMode, fontSize } from 'styles/theme'
import { ARRIVE_FROM_TOP, ROTATE_ON_HOVER } from 'utils/animations'
import media from 'utils/media-queries'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 0 0 auto;
  z-index: 10;
  height: ${(props) => (props.article ? '74px' : '')};
  ${media.lg`
    height: ${(props) => (props.article ? '64px' : '')};
  `}
  ${media.sm`
    display: ${(props) => (props.article ? 'flex' : 'block')};
  `};
  ${media.xs`
    display: block;
    height: 112px;
  `}
`
const LogoWrapper = styled(motion.div)`
  padding: 24px 0 30px 30px;
  ${media.sm`
    padding: ${(props) => (props.article ? '24px 0 24px 24px' : '24px 0 0 0')};
  `};
  ${media.xs`
    padding: 24px 0 0 0;
  `}
`
const Name = styled.h1`
  color: ${darkMode.seagreen};
  white-space: nowrap;
  font-size: ${fontSize.f7};
  text-align: left;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.8px;
  ${media.sm`
    text-align: center;
    font-size: ${fontSize.f7};
  `};
`
const Role = styled.div`
  color: ${darkMode.grey};
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
  justify-content: center;
  grid-column-gap: 4px;
  grid-template-columns: auto auto auto auto;
  padding: 15px 24px 0 24px;
  ${media.sm`
    padding: ${(props) => (props.article ? '15px 12px 0 8px' : '4px 0 0 0')};
    grid-column-gap: 0;
  `}
  ${media.xs`
    padding: 0;
  `}
`
const SocialLink = styled(motion.a)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: ${darkMode.grey};
  &:hover {
    color: ${darkMode.seagreen};
  }
`
const Tooltip = styled.div`
  color: ${darkMode.seagreen};
  padding: 2px 24px 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: ${(props) => (props.visible ? '1' : '0')};
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

  showTooltip = (tooltipText) => {
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
      <Wrapper>
        <LogoWrapper {...ARRIVE_FROM_TOP}>
          <Name>Andrew Schneider</Name>
          <Role>Web(3) Developer</Role>
        </LogoWrapper>
        <motion.div {...ARRIVE_FROM_TOP}>
          <SocialLinks>
            <SocialLink
              href='https://blog.schnogz.xyz'
              target='blank'
              onMouseOver={() => this.showTooltip('Blog')}
              onFocus={() => this.showTooltip('Blog')}
              onMouseLeave={this.hideTooltip}
              onBlur={this.hideTooltip}
              aria-label="Andrew's Blog"
              {...ROTATE_ON_HOVER}
            >
              <FiBookOpen size='18px' />
            </SocialLink>
            <SocialLink
              href='https://github.com/schnogz'
              target='blank'
              onMouseOver={() => this.showTooltip('GitHub')}
              onFocus={() => this.showTooltip('GitHub')}
              onMouseLeave={this.hideTooltip}
              onBlur={this.hideTooltip}
              aria-label="Andrew's GitHub profile"
              {...ROTATE_ON_HOVER}
            >
              <FiGithub size='18px' />
            </SocialLink>
            <SocialLink
              href='https://www.linkedin.com/in/andrewmarkschneider/'
              target='blank'
              onMouseOver={() => this.showTooltip('LinkedIn')}
              onFocus={() => this.showTooltip('LinkedIn')}
              onMouseLeave={this.hideTooltip}
              onBlur={this.hideTooltip}
              aria-label="Andrew's LinkedIn profile"
              {...ROTATE_ON_HOVER}
            >
              <FiLinkedin size='18px' />
            </SocialLink>
            <SocialLink
              href='mailto:andrew.mark.schneider@proton.me?subject=Hey Andrew!'
              target='blank'
              onMouseOver={() => this.showTooltip('Email')}
              onFocus={() => this.showTooltip('Email')}
              onMouseLeave={this.hideTooltip}
              onBlur={this.hideTooltip}
              aria-label='Send an email to Andrew'
              {...ROTATE_ON_HOVER}
            >
              <FiMail size='18px' />
            </SocialLink>
          </SocialLinks>
          <Tooltip visible={this.state.tooltipIsVisible}>
            <TooltipText>{this.state.tooltipText}</TooltipText>
            <TooltipIcon>
              <Icon glyph='arrow' size={24} />
            </TooltipIcon>
          </Tooltip>
        </motion.div>
      </Wrapper>
    )
  }
}

export default Header
