const fs = require('fs');
const Day03 = require('./day03-part01');

const binaryNumbers = fs.readFileSync('input.txt', 'utf8').split("\n");

const binMatrix = binaryNumbers
    .map(binaryNumber => binaryNumber.split("").map(num => Number(num)));


const colLength = binaryNumbers[0].split("").length;
const rowLength = binaryNumbers.length;


const comparator = (total0s, total1s, mostCommon) => {
    const isFirstArrGreater = total0s.length > total1s.length;
    if (mostCommon) {
        return !isFirstArrGreater ? total1s : total0s;
    }
    return isFirstArrGreater ? total1s : total0s;
}


function findCommon(isMostCommon) {
    let rowIndexes = Array.from(Array(rowLength).keys());
    let response;

    Array.from(Array(colLength).keys()).map(i => {
        const total0s = [];
        const total1s = [];
        rowIndexes.forEach(j => binMatrix[j][i]? total1s.push(j) : total0s.push(j));
        rowIndexes = comparator(total0s, total1s, isMostCommon);

        if (rowIndexes.length === 1) {
            response = binMatrix[rowIndexes[0]];
        }
    });
    return response;
}


const finalReport = {
    oxygenGeneratorRating: Day03.binToDec(findCommon(true)),
    scrubberRating: Day03.binToDec(findCommon(false))
}

console.log({
    ...finalReport,
    lifeSupportRating: finalReport.oxygenGeneratorRating * finalReport.scrubberRating
});