import React, { useState } from 'react'
import { type IconType } from 'react-icons'
import { FiBookOpen, FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'

import Icon from 'components/icons'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const arriveFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const rotateOnce = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

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
const LogoWrapper = styled.div`
  padding: 24px 0 30px 30px;
  animation: ${arriveFromTop} 1s ease-in-out both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  ${media.sm`
    padding: 24px 0 0 0;
  `};
  ${media.xs`
    padding: 24px 0 0 0;
  `}
`
const RightSide = styled.div`
  animation: ${arriveFromTop} 1s ease-in-out both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
const Name = styled.h1`
  color: ${darkMode.seagreen};
  white-space: nowrap;
  font-size: ${fontSize.f7};
  text-align: left;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.8px;
  /* same neon glow stack used by SectionHeading */
  text-shadow:
    0 0 14px rgba(102, 252, 241, 0.7),
    0 0 32px rgba(102, 252, 241, 0.5),
    0 0 64px rgba(102, 252, 241, 0.25);
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
const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: ${darkMode.grey};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${darkMode.seagreen};
    animation: ${rotateOnce} 0.5s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    &:hover {
      animation: none;
    }
  }
`
const Tooltip = styled.div<{ $visible: boolean }>`
  color: ${darkMode.seagreen};
  padding: 2px 24px 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: ${(props) => (props.$visible ? '1' : '0')};
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
      <LogoWrapper>
        <Name>Andrew Schneider</Name>
        <Role>Web(3) Developer</Role>
      </LogoWrapper>
      <RightSide>
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
            >
              <LinkIcon size='18px' />
            </SocialLink>
          ))}
        </SocialLinks>
        <Tooltip $visible={tooltipText !== null}>
          <TooltipText>{tooltipText}</TooltipText>
          <TooltipIcon>
            <Icon glyph='arrow' size={24} />
          </TooltipIcon>
        </Tooltip>
      </RightSide>
    </Wrapper>
  )
}

export default Header
