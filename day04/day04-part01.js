const fs = require('fs');



const data = fs.readFileSync('input.txt', 'utf8').split("\n");

const drawNumbers = data[0].trim().split(",").map(num => Number(num));

const boards = {};
let currentKey;

data
    .slice(1)
    .filter(row => row.trim().length > 0)
    .forEach((row, idx) => {
        if (idx % 5 === 0) {
            currentKey = "board" + idx;
            boards[currentKey] = [];
        }
        boards[currentKey].push(row.trim().replace(/\s\s+/g, ' ').split(" ").map(num => Number(num)));
    });


const getColumn = (matrix, column) => matrix.map(row => row[column]);

const getMatrixIndexes = (matrix) => {
    return {
        colIndexes: Array.from(Array(matrix[0].length).keys()),
        rowIndexes: Array.from(Array(matrix.length).keys())
    }
}

const traverseBoard = (board, mentionedNumbers) => {
    const { colIndexes, rowIndexes } = getMatrixIndexes(board);

    const hasInRow = rowIndexes
        .map(i => board[i].every(el => mentionedNumbers.includes(el)))
        .reduce((res, val) => res || val);

    const hasInColumn = colIndexes
        .map(i => getColumn(board, i).every(el => mentionedNumbers.includes(el)))
        .reduce((res, val) => res || val);

    return {
        hasInRow,
        hasInColumn
    }
}

const getSumOfUnmarked = (board, mentionedNumbers) => {
    const { colIndexes, rowIndexes } = getMatrixIndexes(board);

    return rowIndexes
        .map(i =>
            colIndexes
                .map(j => !mentionedNumbers.includes(board[i][j]) ? board[i][j] : 0))
        .flat()
        .reduce((sum, num) => sum + num);
}

const checkBoards = (mentionedNumbers) => {
    let finalResponse;
    Object.keys(boards).forEach(key => {
        const { hasInRow, hasInColumn } = traverseBoard(boards[key], mentionedNumbers);
        const isBingo = hasInRow || hasInColumn;
        if (isBingo) {
            const sumOfUnmarked = getSumOfUnmarked(boards[key], mentionedNumbers);
            const lastMentioned = mentionedNumbers[mentionedNumbers.length - 1];
            delete boards[key];
            finalResponse = {
                sumOfUnmarked,
                lastMentioned,
                multiplication: sumOfUnmarked * lastMentioned
            };
        }
    });
    return finalResponse;
}

const mentionedNumbers = [];
const winningBoards = drawNumbers.map(drawNumber => {
    mentionedNumbers.push(drawNumber);
    return checkBoards(mentionedNumbers, boards);
}).filter(i => i);

console.log({
    firstWinningBoard: winningBoards[0],
    lastWinningBoard: winningBoards.pop()
});