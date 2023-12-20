const LetterNumbers = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
};

/**
 * 
 * @param {*} text to find digit
 * @returns returns the first digit of a string or undefined
 */
function getFirstDigit(text) {
  const result = +('' + text)
    .split('')
    .find(element => !isNaN(element));

  return {
      value: isNaN(result) ? undefined : result,
      index: text.indexOf(result) === -1 ? undefined : text.indexOf(result)
  };
}

/**
 * 
 * @param {*} text to find last digit
 * @returns returns the last digit of a string or undefined
 */
function getLastDigit(text) {
  const reversed = new String(text).split('').reverse().join('');
  const result = getFirstDigit(reversed);

  return {...result, index: (text.length - 1 - result.index) || undefined};
}

/**
 * 
 * @param {*} text the text to find first and last digit
 * @returns the number identified by first and last digit
 */
function getFirstLastDigitAsNumber(text) {
  const first = getFirstDigit(text);
  const last = getLastDigit(text);

  const result = { 
    value:
      isNaN(Number(`${first.value}${last.value}`)) 
      ? 0 
      : Number(`${first.value}${last.value}`),
    index: [first.index, last.index].filter(e => e !== undefined)
  }

  return result
}

/**
 * 
 * @param {*} text text to identify lettered numbers
 * @returns list of objects with index and value or empty array
 */
function getSpelledNumbers(text) {
  const letterNumbers = Object.keys(LetterNumbers).map(number => number.toLowerCase());
  const result = new String(text);
  const positionMap = [];

  letterNumbers.forEach(number => {
      let startIndex = 0;

      while(result.includes(number, startIndex)) {
        positionMap.push({
          index: result.indexOf(number, startIndex), 
          value: LetterNumbers[number.toUpperCase()]
        });
        startIndex = result.indexOf(number, startIndex) + number.length;
      }
  });

  positionMap.sort((a,b) => a.index - b.index);

  return positionMap.length 
    ? [ positionMap[0], positionMap[positionMap.length - 1] ]
        .filter(item => !!item.value)
    : [];
}


/**
 * 
 * @param {*} input array of numbers to sum up
 * @returns sum of all values
 */
function total(input) {
  return input
    .reduce((acc, cur) => acc += cur)
}


export {
  getFirstDigit,
  getLastDigit,
  getFirstLastDigitAsNumber,
  getSpelledNumbers,
  total
}