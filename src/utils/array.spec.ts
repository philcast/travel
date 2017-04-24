import { moveElement } from './array'

const array = ['a', 'b', 'c', 'd'];

it('should move from 1 to 2', () => {
  expect(moveElement(array, 1, 2)).toEqual(['a', 'c', 'b', 'd']);
});

it('should move from 3 to 1', () => {
  expect(moveElement(array, 3, 1)).toEqual(['a', 'd', 'b', 'c']);
});

it('should move from 1 to 1', () => {
  expect(moveElement(array, 1, 1)).toEqual(['a', 'b', 'c', 'd']);
});
