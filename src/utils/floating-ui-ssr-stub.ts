// SSR stub for @floating-ui/react.
//
// @floating-ui/react touches the DOM at import time. Pulled in by both
// yet-another-react-lightbox and react-activity-calendar — neither actually
// needs floating-ui during static HTML generation (the lightbox is closed
// at SSR; the calendar's tooltip is hover-only). Aliased to no-op stubs
// during HTML compilation stages.
//
// Pure functions, no React import — keeps the SSR module graph minimal.

const NoopComponent = () => null
const noopHook = () => {
  return {}
}
const noopHookRefs = () => {
  return { getFloatingProps: noopHook, getReferenceProps: noopHook }
}
const noopMiddleware = () => {
  return {
    fn: () => {
      return {}
    },
    name: 'noop',
  }
}
const noopAsync = async () => {
  return {}
}
const identity = <T>(x: T): T => x

export const arrow = noopMiddleware
export const autoPlacement = noopMiddleware
export const autoUpdate = () => () => {}
export const computePosition = noopAsync
export const detectOverflow = noopAsync
export const flip = noopMiddleware
export const getOverflowAncestors = () => []
export const hide = noopMiddleware
export const inline = noopMiddleware
export const inner = noopMiddleware
export const limitShift = () => {
  return {}
}
export const offset = noopMiddleware
export const platform = {}
export const safePolygon = () => () => {}
export const shift = noopMiddleware
export const size = noopMiddleware

export const Composite = NoopComponent
export const CompositeItem = NoopComponent
export const FloatingArrow = NoopComponent
export const FloatingDelayGroup = NoopComponent
export const FloatingFocusManager = NoopComponent
export const FloatingList = NoopComponent
export const FloatingNode = NoopComponent
export const FloatingOverlay = NoopComponent
export const FloatingPortal = NoopComponent
export const FloatingTree = NoopComponent
export const NextFloatingDelayGroup = NoopComponent

export const useClick = noopHook
export const useClientPoint = noopHook
export const useDelayGroup = noopHook
export const useDelayGroupContext = () => {
  return { currentId: null, delay: 0, initialDelay: 0 }
}
export const useDismiss = noopHook
export const useFloating = () => {
  return {
    context: {},
    elements: {},
    floatingStyles: {},
    middlewareData: {},
    placement: 'top',
    refs: { setFloating: identity, setReference: identity },
    strategy: 'absolute',
    update: () => {},
    x: 0,
    y: 0,
  }
}
export const useFloatingNodeId = () => ''
export const useFloatingParentNodeId = () => null
export const useFloatingPortalNode = () => null
export const useFloatingRootContext = noopHook
export const useFloatingTree = () => null
export const useFocus = noopHook
export const useHover = noopHook
export const useId = () => ''
export const useInnerOffset = noopHook
export const useInteractions = noopHookRefs
export const useListItem = () => {
  return { index: -1, ref: identity }
}
export const useListNavigation = noopHook
export const useMergeRefs = () => identity
export const useNextDelayGroup = () => {
  return { delay: 0, initialDelay: 0 }
}
export const useRole = noopHook
export const useTransitionStatus = () => {
  return { isMounted: false, status: 'unmounted' }
}
export const useTransitionStyles = () => {
  return { isMounted: false, styles: {} }
}
