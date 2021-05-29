import  { sum } from '../src/client/js/sum'
import  { validateString } from '../src/client/js/sum'
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test('validate strings', () => {
  expect(validateString("")).toBe(false);
  expect(validateString("Hello")).toBe(true);
});