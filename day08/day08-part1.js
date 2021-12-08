const fs = require('fs');

const easydigits = [2, 3, 4, 7];

const signals = fs.readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(line => {
        const output = line.split("|")[1].trim().split(" ");
        const uniques = output
            .map(digit => digit.length)
            .map(length => easydigits.includes(length))
            .filter(i => i).length;

        return uniques;
    })
    .reduce((sum, val) => sum + val);

console.log(signals);