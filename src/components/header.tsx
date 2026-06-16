import React, { useState } from 'react'
import { type IconType } from 'react-icons'
import { FiBookOpen, FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
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
  ${media.sm`
    display: block;
  `};
  ${media.xs`
    display: block;
    height: 112px;
  `}
`
const LogoWrapper = styled(motion.div)`
  padding: 24px 0 30px 30px;
  ${media.sm`
    padding: 24px 0 0 0;
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
  grid-template-columns: auto auto auto auto auto;
  padding: 15px 24px 0 24px;
  ${media.sm`
    padding: 4px 0 0 0;
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
const Tooltip = styled.div<{ visible: boolean }>`
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

type SocialLinkConfig = {
  Icon: IconType
  ariaLabel: string
  href: string
  label: string
}

const SOCIAL_LINKS: SocialLinkConfig[] = [
  {
    Icon: FiBookOpen,
    ariaLabel: "Andrew's Blog",
    href: 'https://blog.schnogz.xyz',
    label: 'Blog',
  },
  {
    Icon: FiGithub,
    ariaLabel: "Andrew's GitHub profile",
    href: 'https://github.com/schnogz',
    label: 'GitHub',
  },
  {
    Icon: FiLinkedin,
    ariaLabel: "Andrew's LinkedIn profile",
    href: 'https://www.linkedin.com/in/andrewmarkschneider/',
    label: 'LinkedIn',
  },
  {
    Icon: FiFileText,
    ariaLabel: "Andrew's resume (PDF)",
    href: '/Andrew_Schneider_Resume.pdf',
    label: 'Resume',
  },
  {
    Icon: FiMail,
    ariaLabel: 'Send an email to Andrew',
    href: 'mailto:andrew.mark.schneider@proton.me?subject=Hey Andrew!',
    label: 'Email',
  },
]

const Header = () => {
  const [tooltipText, setTooltipText] = useState<string | null>(null)
  const hideTooltip = () => setTooltipText(null)

  return (
    <Wrapper>
      <LogoWrapper {...ARRIVE_FROM_TOP}>
        <Name>Andrew Schneider</Name>
        <Role>Web(3) Developer</Role>
      </LogoWrapper>
      <motion.div {...ARRIVE_FROM_TOP}>
        <SocialLinks>
          {SOCIAL_LINKS.map(({ Icon: LinkIcon, ariaLabel, href, label }) => (
            <SocialLink
              key={href}
              href={href}
              target='_blank'
              onMouseOver={() => setTooltipText(label)}
              onFocus={() => setTooltipText(label)}
              onMouseLeave={hideTooltip}
              onBlur={hideTooltip}
              aria-label={ariaLabel}
              {...ROTATE_ON_HOVER}
            >
              <LinkIcon size='18px' />
            </SocialLink>
          ))}
        </SocialLinks>
        <Tooltip visible={tooltipText !== null}>
          <TooltipText>{tooltipText}</TooltipText>
          <TooltipIcon>
            <Icon glyph='arrow' size={24} />
          </TooltipIcon>
        </Tooltip>
      </motion.div>
    </Wrapper>
  )
}

export default Header
