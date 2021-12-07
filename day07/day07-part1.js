const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').split(",").map(line => Number(line.trim()));


const differencesMap = {};

const getDifference = (val, arr) => {
    return arr.map(item => Math.abs(item - val)).reduce((sum, val) => sum + val);
}

let smallest;
let smallestKey = -1;
data.forEach((horizontalVal, idx) => {
    const difference = getDifference(horizontalVal, data);
    differencesMap[idx] = difference;
    
    if (idx === 0) smallest = difference;

    if (difference < smallest) {
        smallest = difference;
        smallestKey = idx;
    }
});

console.log({
    smallest,
    smallestKey
});