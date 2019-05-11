import { getFilledArray, shuffle, chunk } from './util';

describe('getFilledArray', () => {
  test('returns an array filled with a given value', () => {
    const testValues = [100, 'foo', true, { a: 1, b: 2 }];
    for (const value of testValues) {
      const arr = getFilledArray(10, value);
      expect(arr[2]).toBe(value);
      expect(arr[8]).toBe(value);
    }
  });
  test('returns an array with a given length', () => {
    const testValues = [1, 9, 1000];
    for (const count of testValues) {
      const arr = getFilledArray(count, 'test');
      expect(arr.length).toBe(count);
    }
  });
});

describe('shuffle', () => {
  test('returns a shuffled array', () => {
    const oneTo100 = Array.from({ length: 100 }).map((_, i) => i);
    const shuffled = shuffle(oneTo100);
    expect(JSON.stringify(oneTo100) === JSON.stringify(shuffled)).toBe(false);
    expect(shuffled.every(n => typeof n === 'number')).toBe(true);
    expect(shuffled.every(n => n < 100)).toBe(true);
    expect(shuffled.every(n => n >= 0)).toBe(true);
  });
});

describe('chunk', () => {
  test('groups entries of the original array into an array of smaller arrays', () => {
    const arr = getFilledArray(100, 'test');
    const chunked = chunk(arr, 5);
    expect(chunked.length).toBe(20);
    expect(chunked.every(chnk => chnk.length === 5)).toBe(true);
  });
});
