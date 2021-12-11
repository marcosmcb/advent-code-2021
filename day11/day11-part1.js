const fs = require('fs');

const matrix = fs
    .readFileSync('sample.txt', 'utf8')
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
    if (row < 0 || row > rowIndexes.length - 1) return undefined;
    if (col < 0 || col > colIndexes.length - 1) return undefined;

    return matrix[row][col];
}

const increaseAdjacentPoints = (matrix, i, j, flashed) => {
    const obj = {};
    obj[`${i - 1},${j - 1}`] = getPosition(matrix, i - 1, j - 1) !== undefined ? setAdjacentPointEnergy(matrix, i - 1, j - 1, flashed) : -1;
    obj[`${i - 1},${j}`] = getPosition(matrix, i - 1, j) !== undefined ? setAdjacentPointEnergy(matrix, i - 1, j, flashed) : -1;
    obj[`${i - 1},${j + 1}`] = getPosition(matrix, i - 1, j + 1) !== undefined ? setAdjacentPointEnergy(matrix, i - 1, j + 1, flashed) : -1;
    obj[`${i},${j - 1}`] = getPosition(matrix, i, j - 1) !== undefined ? setAdjacentPointEnergy(matrix, i, j - 1, flashed) : -1;
    obj[`${i},${j + 1}`] = getPosition(matrix, i, j + 1) !== undefined ? setAdjacentPointEnergy(matrix, i, j + 1, flashed) : -1;
    obj[`${i + 1},${j - 1}`] = getPosition(matrix, i + 1, j - 1) !== undefined ? setAdjacentPointEnergy(matrix, i + 1, j - 1, flashed) : -1;
    obj[`${i + 1},${j}`] = getPosition(matrix, i + 1, j) !== undefined ? setAdjacentPointEnergy(matrix, i + 1, j, flashed) : -1;
    obj[`${i + 1},${j + 1}`] = getPosition(matrix, i + 1, j + 1) !== undefined ? setAdjacentPointEnergy(matrix, i + 1, j + 1, flashed) : -1;

    // console.log(`Checking row[${i}] and col[${j}]`, obj);
    return obj;
}

const setAdjacentPointEnergy = (matrix, i, j, flashed) => {
    const key = `${i},${j}`;
    if (flashed.has(key)) {
        return matrix[i][j];
    }

    const item = matrix[i][j] + 1;
    matrix[i][j] = item > 9 ? 0 : item;
    return matrix[i][j];
}

const flashAdjacents = (matrix, i, j, flashed) => {

    const adjacentPoints = increaseAdjacentPoints(matrix, i, j, flashed);
    const flashedPoints = Object
        .keys(adjacentPoints)
        .filter(key => !flashed.has(key) && adjacentPoints[key] === 0);

    /* 
        If there are flashes, we want to go to each position which flashed
        And call flashAdjacents again, we put the visited items with value of zero in our set
    */
    flashedPoints.forEach(coordinates => flashed.add(coordinates));
    flashedPoints.forEach(coordinates => {
        const coords = coordinates.split(",");
        const row = Number(coords[0]);
        const col = Number(coords[1]);
        flashAdjacents(matrix, row, col, flashed);
    });
    return;
}

const computerNumberOfFlashes = () => {
    const flashedCoordinates = new Set();
    for (let i = 0; i < rowIndexes.length; i++) {
        for (let j = 0; j < colIndexes.length; j++) {
            const key = `${i},${j}`;
            let currItem = matrix[i][j] + 1;
            if (currItem > 9) {
                flashedCoordinates.add(key);
                matrix[i][j] = 0;
                flashAdjacents(matrix, i, j, flashedCoordinates);
            } else {
                if (!flashedCoordinates.has(key)) {
                    matrix[i][j] = currItem;
                }
            }
        }
    }
    return flashedCoordinates.size;
}



const doProblem1 = () => {
    let flashes = 0;
    let step = 0;
    let MAX_STEPS = 100;
    while (step < MAX_STEPS) {
        flashes += computerNumberOfFlashes();
        step++;
    }
    console.log(`Problem #1, number of flashes ${flashes} after ${step} steps`);
}

const doProblem2 = () => {
    let flashedItems;
    let step = 0;
    do {
        flashedItems = computerNumberOfFlashes();
        step++;
    } while (flashedItems !== (colIndexes.length * rowIndexes.length));
    console.log(`Problem #2, number of steps ${step}`);
}


doProblem1();
doProblem2();