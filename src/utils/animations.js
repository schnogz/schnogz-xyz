export const ROTATE_WHILE_TAP = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0 },
  transition: { duration: 1.5 },
  whileTap: { rotate: 180, scale: 0.5 },
}

export const ROTATE_ON_HOVER = {
  transition: {
    duration: 0.5,
    ease: 'easeInOut',
  },
  whileHover: { rotate: 360 },
}

export const ARRIVE_FROM_TOP = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: -50 },
  transition: {
    duration: 1,
    ease: 'easeInOut',
  },
}
