const fs = require('fs');

const matrix = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(line => line.split("").map(point => Number(point)));

const getMatrixIndexes = (matrix) => {
    return {
        colIndexes: Array.from(Array(matrix[0].length).keys()),
        rowIndexes: Array.from(Array(matrix.length).keys())
    }
}

const { colIndexes, rowIndexes } = getMatrixIndexes(matrix);

const mapLowPoints = {}

const getPosition = (matrix, row, col) => {
    const { colIndexes, rowIndexes } = getMatrixIndexes(matrix);
    if (row < 0 || row > rowIndexes.length-1) return 10;
    if (col < 0 || col > colIndexes.length-1) return 10;

    return matrix[row][col];
}

for (let i=0; i < rowIndexes.length; i++) {
    for (let j=0; j < colIndexes.length; j++) {
        const currItem = getPosition(matrix, i, j);
        const topItem = getPosition(matrix, i-1, j);
        const rightItem = getPosition(matrix, i, j+1);
        const bottomIttem = getPosition(matrix, i+1, j);
        const leftItem = getPosition(matrix, i, j-1);

        if (currItem < topItem && currItem < rightItem &&
            currItem < bottomIttem && currItem < leftItem) {
                mapLowPoints[i + "" + j] = currItem+1;
            }
    }
}

console.log(Object.values(mapLowPoints).reduce((sum, val) => sum+val));