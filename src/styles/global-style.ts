import { createGlobalStyle } from 'styled-components'

import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'

const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        -webkit-tap-highlight-color: transparent;
    }

    body {
        margin: 0;
        height: 100%;
        background-color: ${darkMode.black};
        color: ${darkMode.grey};
        font-family: system-ui, sans-serif;
        font-feature-settings: "liga", "kern";
        font-variant-ligatures: contextual common-ligatures;
        font-kerning: normal;
        scroll-behavior: smooth;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.5;
        font-size: ${fontSize.f4};
        letter-spacing: -0.2px;
        ${media.lg`
            font-size: ${fontSize.f3};
        `}
        ${media.sm`
            font-size: ${fontSize.f3};
            line-height: 1.4;
        `}
    }

    h1 {
        font-size: ${fontSize.f11};
        font-weight: 700;
        margin: 0 0 24px 0;
        padding: 0;
        line-height: 1.1;
        letter-spacing: -1.5px;
        ${media.lg`
            font-size: ${fontSize.f10};
        `}
        ${media.xs`
            font-size: ${fontSize.f8};
        `}
    }

    h2 {
        font-size: ${fontSize.f8};
        font-weight: 700;
        margin: 16px 0 20px 0;
        padding: 0;
        line-height: 1.1;
        letter-spacing: -0.4px;
        ${media.lg`
            font-size: ${fontSize.f7};
        `}
    }

    h3 {
        font-size: ${fontSize.f6};
        font-weight: 700;
        margin: 0 0 28px 0;
        padding: 0;
        line-height: 1.25;
        letter-spacing: -0.4px;
        ${media.lg`
            font-size: ${fontSize.f5};
            letter-spacing: -0.3px;
            margin: 0 0 16px 0;
        `}
    }

    h4 {
        font-size: ${fontSize.f5};
        font-weight: 700;
        margin: 0 0 8px 0;
        padding: 0;
        line-height: 1.1;
        letter-spacing: -0.4px;
        ${media.sm`
            font-size: ${fontSize.f4};
        `}
    }

    p {
        color: ${darkMode.grey};
        font-size: ${fontSize.f3};
        line-height: 1.4;
        ${media.lg`
            font-size: ${fontSize.f3};
            margin: 0.9em 0;
        `}
        ${media.sm`
            line-height: 1.4;
        `}
    }

    p + h2 {
        margin-top: 48px;
    }

    p + h3 {
        margin-top: 32px;
    }

    a {
        color: ${darkMode.blue};
        text-decoration: none;
    }

    a:focus {
        outline: 0;
    }

    a:focus-visible {
        outline: thin dotted;
    }

    ::selection {
        background: rgba(0, 125, 255, .99);
        color: white;
    }

    #___gatsby, #gatsby-focus-wrapper {
        height: 100%;
    }

    // GH CALENDAR STYLES
    .react-activity-calendar__scroll-container > svg {
        height: 96px;
    }

    .react-activity-calendar__footer {
        display: flex;
        justify-content: space-between;
    }

    .react-activity-calendar__legend-month > text {
        font-size: 14px;
        color: ${darkMode.grey};
    }

    .react-activity-calendar__count {
        font-size: 14px;
        color: ${darkMode.grey};
    }
`

export default GlobalStyle
