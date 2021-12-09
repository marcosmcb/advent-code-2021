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

const getPosition = (matrix, row, col) => {
    if (row < 0 || row > rowIndexes.length - 1) return 10;
    if (col < 0 || col > colIndexes.length - 1) return 10;

    return matrix[row][col];
}

const isSmallestPoint = (currItem, adjacentPoints) => {
    const { topItem, rightItem, bottomItem, leftItem } = adjacentPoints;
    return currItem < topItem &&
        currItem < rightItem &&
        currItem < bottomItem &&
        currItem < leftItem;
}

const getAdjacentPoints = (matrix, i, j) => {
    return {
        topItem: getPosition(matrix, i - 1, j),
        rightItem: getPosition(matrix, i, j + 1),
        bottomItem: getPosition(matrix, i + 1, j),
        leftItem: getPosition(matrix, i, j - 1)
    }
}

const mapLowPoints = {};
for (let i = 0; i < rowIndexes.length; i++) {
    for (let j = 0; j < colIndexes.length; j++) {
        const currItem = getPosition(matrix, i, j);
        const adjacentPoints = getAdjacentPoints(matrix, i, j);
        if (isSmallestPoint(currItem, adjacentPoints)) {
            mapLowPoints[i + "," + j] = currItem + 1;
        }
    }
}
const sumTop3 = Object.values(mapLowPoints).reduce((sum, val) => sum + val);
console.log(sumTop3);