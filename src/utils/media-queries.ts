import { css, type Interpolation, type RuleSet } from 'styled-components'

const sizes = {
  lg: 1300,
  md: 900,
  sm: 600,
  xl: 1700,
  xs: 350,
} as const

type Breakpoint = keyof typeof sizes
type MediaFn = <Props extends object = object>(
  template: TemplateStringsArray,
  ...interpolations: Interpolation<Props>[]
) => RuleSet<Props>

const media = (Object.keys(sizes) as Breakpoint[]).reduce(
  (acc, label) => {
    const fn = (template: TemplateStringsArray, ...args: Interpolation<object>[]) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(template, ...args)};
      }
    `
    acc[label] = fn as MediaFn
    return acc
  },
  {} as Record<Breakpoint, MediaFn>,
)

export default media
