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

const getAdjacentPoints = (matrix, i, j) => {
    return {
        topItem: getPosition(matrix, i - 1, j),
        rightItem: getPosition(matrix, i, j + 1),
        bottomItem: getPosition(matrix, i + 1, j),
        leftItem: getPosition(matrix, i, j - 1)
    }
}

const isSmallestPoint = (currItem, adjacentPoints) => {
    const { topItem, rightItem, bottomItem, leftItem } = adjacentPoints;
    return currItem < topItem &&
        currItem < rightItem &&
        currItem < bottomItem &&
        currItem < leftItem;
}

const traverseMatrix = (matrix, row, col, previousItem, basins) => {
    const key = row + "," + col;
    if (key in basins) {
        return basins[key];
    }

    if (row < 0 || row > rowIndexes.length - 1) return 0;
    if (col < 0 || col > colIndexes.length - 1) return 0;

    const currItem = matrix[row][col];

    if (currItem === 9 || currItem < previousItem) return 0;

    basins[key] = 1;

    traverseMatrix(matrix, row - 1, col, currItem, basins);
    traverseMatrix(matrix, row, col + 1, currItem, basins);
    traverseMatrix(matrix, row + 1, col, currItem, basins);
    traverseMatrix(matrix, row, col - 1, currItem, basins);
    return;
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

const basin = {};
Object
    .keys(mapLowPoints)
    .forEach(coordinates => {
        const splitCoordinates = coordinates.split(",").map(coord => Number(coord));
        const row = splitCoordinates[0];
        const col = splitCoordinates[1];

        const myBasins = {};
        traverseMatrix(matrix, row, col, -1, myBasins);
        basin[row + "," + col] = Object.keys(myBasins).length;
    });

const multiplication = Object
    .values(basin)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((multi, val) => multi * val);

console.log("MULT", multiplication);