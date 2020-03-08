export const roundToHalf = (value) => {
  const valueFloor = Math.floor(value);
  return valueFloor + Math.round(value - valueFloor) / 2;
};

export default roundToHalf;
