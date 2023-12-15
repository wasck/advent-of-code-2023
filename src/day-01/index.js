import { getFirstLastDigitAsNumber, total } from './index.lib.mjs';
import { readFile } from '../shared/file-reader.mjs';

// Part 1
const file01Content = readFile('./src/day-01/puzzle.input.txt');
const numbersFile1 = file01Content.map(value => getFirstLastDigitAsNumber(value).value);

console.log('Part I calculated value:', total(numbersFile1));

