const math = require("../src/math");

test("adds 1 + 2 to equal 3", () => {
  expect(math.add(1, 2)).toBe(3);
});

test("subtracts 5 - 2 to equal 3", () => {
  expect(math.subtract(5, 2)).toBe(3);
});

test("multiplies 3 * 4 to equal 12", () => {
  expect(math.multiply(3, 4)).toBe(12);
});

test("divides 6 / 2 to equal 3", () => {
  expect(math.divide(6, 2)).toBe(3);
});

test("throws error when dividing by zero", () => {
  expect(() => math.divide(6, 0)).toThrow("Cannot divide by zero");
});
