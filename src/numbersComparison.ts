export const isAlmostEqual = (x: number, y: number, tolerance: number = 1e-5) => Math.abs(x - y) < tolerance;

export const isLessThan = (x: number, y: number, tolerance: number = 1e-5) => x < y && !isAlmostEqual(x, y, tolerance);

export const isAlmostEqualOrLessThan = (x: number, y: number, tolerance: number = 1e-5) => x < y || isAlmostEqual(x, y, tolerance);