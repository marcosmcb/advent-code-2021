const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').split(",").map(line => Number(line.trim()));

const differencesMap = {};

const toArray = (num) => [...Array(num).keys()];

const rateDifference = {};

const getDifference = (val, arr) => {
    return arr.map((item) => {
        const difference = Math.abs(item - val);
        if (!rateDifference[difference]) {
            rateDifference[difference] = toArray(difference+1).reduce((sum, item) => sum+item);
        } 
        return rateDifference[difference];
    }).reduce((sum, val) => sum + val);
}

let smallest;
let smallestKey = -1;
data.forEach((_, idx) => {
    const difference = getDifference(idx+1, data);
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