import { rand } from './helpers'

export const SPRING_CONFIG = {
  damping: 100,
  stiffness: 100,
  mass: rand(1, 3),
}

export const RANGE = 0.3 // parallax range of movement. 1 represents maximum (100%)
