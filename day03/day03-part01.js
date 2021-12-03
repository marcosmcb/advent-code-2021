const fs = require('fs');

const binaryNumbers = fs.readFileSync('input.txt', 'utf8').split("\n");

const binMatrix = binaryNumbers
    .map(binaryNumber => binaryNumber.split("").map(num => Number(num)));

const colIndexes = Array.from(Array(binMatrix[0].length).keys());
const rowIndexes = Array.from(Array(binMatrix.length).keys());

const binToDec = (binArray) => {
    return binArray
        .reverse()
        .map((bin, idx) => bin ? Math.pow(2, idx) : 0)
        .reduce((sum, num) => sum + num);
}

const comparator = (total0s, total1s, mostCommon) => {
    const hasMoreZerosThanOnes = total0s.length > total1s.length;
    if (mostCommon) {
        return !hasMoreZerosThanOnes ? total1s : total0s;
    }
    return hasMoreZerosThanOnes ? total1s : total0s;
}

const createConsumptionReport = () => {
    return colIndexes.map(i => {
        const total1s = rowIndexes.filter(j => binMatrix[j][i]).length;
        const total0s = rowIndexes.length - total1s;

        return total0s > total1s ? {
            gammaRate: 0,
            epsilonRate: 1
        } : {
            gammaRate: 1,
            epsilonRate: 0
        }
    });
}

const findCommon = (rowIndexes, isMostCommon) => {
    let response;

    colIndexes.map(i => {
        const total0s = [];
        const total1s = [];
        rowIndexes.forEach(j => binMatrix[j][i] ? total1s.push(j) : total0s.push(j));
        rowIndexes = comparator(total0s, total1s, isMostCommon);

        if (rowIndexes.length === 1) {
            response = binMatrix[rowIndexes[0]];
        }
    });
    return response;
}

const report = createConsumptionReport();


const finalReport = {
    gammaRate: binToDec(report.map(val => val.gammaRate)),
    epsilonRate: binToDec(report.map(val => val.epsilonRate)),
    oxygenGeneratorRating: binToDec(findCommon(rowIndexes, true)),
    scrubberRating: binToDec(findCommon(rowIndexes, false))
}



console.log({
    ...finalReport,
    powerConsumption: finalReport.gammaRate * finalReport.epsilonRate,
    lifeSupportRating: finalReport.oxygenGeneratorRating * finalReport.scrubberRating
});