const fs = require('fs');
const Day01 = require('./day01-part01');

const numbers = fs.readFileSync('input.txt', 'utf8').split("\n").map(num => Number(num));

const measurements = numbers
    .filter((_, idx) => numbers[idx + 2] !== undefined)
    .map((val, idx) => val + numbers[idx + 1] + numbers[idx + 2]);

console.log(Day01.calculateIncrease(measurements));