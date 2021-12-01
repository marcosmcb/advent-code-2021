const fs = require('fs')

const measurements = fs.readFileSync('input.txt', 'utf8').split("\n").map(num => Number(num));

const calculateIncrease = (numbers) => {
    let lastNumber = numbers[0];
    return numbers.map(num => {
        const resp = num > lastNumber ? 1 : 0;
        lastNumber = num;
        return resp;
    })
    .filter(i => i).length;
}

module.exports = {
    calculateIncrease
}

console.log(calculateIncrease(measurements));