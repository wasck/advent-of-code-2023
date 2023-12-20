import {expect, it, describe} from 'vitest';
import {
  getFirstDigit,
  getLastDigit,
  getFirstLastDigitAsNumber,
  getSpelledNumbers,
  total
} from './index.lib.mjs';
import { readFile } from '../shared/file-reader.mjs';

describe('Numbers in strings - Part I', () => {
  const toTest = [
    { text: '1abc2', expect: {value: 12, index: [0,4]} },
    { text: 'pqr3stuvwx', expect: {value: 33, index: [3,3]} },
    { text: 'a1b2c3d4e5f', expect: {value: 15, index: [1,9]} },
    { text: 'treb7uchet', expect: {value: 77, index: [4,4]} },
    { text: '578910', expect: {value: 50, index: [0,5]} },
    { text: '078910', expect: {value: 0, index: [0,5]} },
    { text: 'abcd', expect: {value: undefined, index: []}},
  ];

  const sum = toTest
    .map(test => test.expect.value)
    .map(value => value || 0)
    .reduce((acc, cur) => acc += cur);


  describe('Get first digit', () => {
    toTest.map(test => {
      const value = +('' + test.expect.value).split('')[0];
      const expect = {value: isNaN(value) ? undefined : value, index: test.expect.index[0] };
      return { ...test, expect }
    })
    .forEach(test => {
      it(`should return ${test.expect.value} at [${test.expect.index}] for string ${test.text}`, () => {
        expect(getFirstDigit(test.text)).toEqual(test.expect);
      })
    })
  });
  
  describe('Get last digit', () => {
    toTest.map(test => {
      const value = +(('' + test.expect.value).split('')[1] 
        || ('' + test.expect.value).split('')[0]);
      const expect = { value: isNaN(value) ? undefined : value, index: test.expect.index[1] };
      return { ...test, expect }
    })
    .forEach(test => {
      it(`should return ${test.expect.value} at [${test.expect.index}] for string ${test.text}`, () => {
        expect(getLastDigit(test.text)).toEqual(test.expect);
      })
    })
  });

  describe('Get first and last digit as number', () => {
    toTest
      .map(item => ({
        ...item,
        expect: { 
          value: item.expect.value ? item.expect.value : 0,
          index: item.expect.index 
        }
      }))
      .forEach(test => {
        it(`should return ${test.expect.value} at [${test.expect.index}] from ${test.text}`, () => {
          expect(getFirstLastDigitAsNumber(test.text)).toEqual(test.expect)
        })
      })
  });

  it(`should sum up number to be ${sum}`, () => {
    const test = toTest
      .map(test => test.expect.value)
      .map(value => (value ? value : 0));

    expect(total(test)).toBe(sum);
  });

  it('should return 55621 as result of input file 1', () => {
    const content = readFile('./src/day-01/puzzle.input.txt');
    const numbers = content
      .map((text) => getFirstLastDigitAsNumber(text))
      .map(item => item.value);

    expect(total(numbers)).toBe(55621);
  });
})


describe('Numbers in strings - Part II', () => {
  const toTest = [
    { text: 'two1nine', expect: {value: 29, index: [0,4]} },
    { text: 'eightwothree', expect: {value: 83, index: [0,7]} },
    { text: 'abcone2threexyz', expect: {value: 13, index: [3,7]} },
    { text: 'xtwone3four', expect: {value: 24, index: [1,7]} },
    { text: '4nineeightseven2', expect: {value: 42, index: [0,15]} },
    { text: 'zoneight234', expect: {value: 14, index: [1,10]} },
    { text: '7pqrstsixteen', expect: {value: 76, index: [0,6]}},
  ];

  const sum = toTest
    .map(test => test.expect.value)
    .map(value => value || 0)
    .reduce((acc, cur) => acc += cur);

  describe('Find first and last spelled numbers', () => {
    const toTest = [
      { text: 'two1nine', expect: {value: 29, index: [0,4]} },
      { text: 'eightwothree', expect: {value: 83, index: [0,7]} },
      { text: 'abcone2threexyz', expect: {value: 13, index: [3,7]} },
      { text: 'xtwone3four', expect: {value: 24, index: [1,7]} },
      { text: '4nineeightseven2', expect: {value: 97, index: [1,10]} },
      { text: 'zoneight234', expect: {value: 18, index: [1,3]} },
      { text: '7pqrstsixteen', expect: {value: 66, index: [6,6]}},
      { text: 'nineight', expect: {value: 98, index: [0,3]}},
    ].map((test) => {
      return {
        ...test,
        expect: [
          {index: test.expect.index[0], value: +('' + test.expect.value).split('')[0]},
          {index: test.expect.index[1], value: +('' + test.expect.value).split('')[1]},
        ]
      }
    })

    toTest.forEach(test => {
      const value = test.expect.map(e => e.value);

      it(`should find ${value} in '${test.text}'`, () => {
        expect(getSpelledNumbers(test.text)).toEqual(test.expect)
      })
    })
  });

})