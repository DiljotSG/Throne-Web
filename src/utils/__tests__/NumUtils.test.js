import roundToHalf from '../NumUtils';

describe('NumUtils', () => {
  describe('roundToHalf', () => {
    it('rounds numbers to 0.5 increments', () => {
      expect(roundToHalf(0.0)).toBe(0.0);
      expect(roundToHalf(0.1)).toBe(0.0);
      expect(roundToHalf(1.5)).toBe(1.5);
      expect(roundToHalf(3.64534)).toBe(3.5);
      expect(roundToHalf(4.0)).toBe(4);
      expect(roundToHalf(-1.334)).toBe(-1.5);
      expect(roundToHalf(-3.9999)).toBe(-4);
    });
  });
});
