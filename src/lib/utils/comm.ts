function roundToDecimalNum(target: number, demicalNum: number = 1): number {
  if (demicalNum === 0) return Math.round(target);
  const multiplier: number = Math.pow(10, demicalNum);
  return Math.round(target * multiplier) / multiplier;
}

export {
  roundToDecimalNum,
};