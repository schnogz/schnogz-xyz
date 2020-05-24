export const calculateMinHeight = (range) => (height) => height + height * range
export const setTransformRange = (offset) => [offset - 500, offset + 500]
export const setTransformValues = (range) => ['0%', `${range * 100}%`]
