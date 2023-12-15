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
  total
}