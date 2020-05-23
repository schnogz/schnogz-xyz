export const calculateMinHeight = (range) => (height) => height + height * range

export const rand = (min = 0, max = 100) =>
  Math.floor(Math.random() * (+max - +min)) + +min
