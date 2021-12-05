const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').split("\n");

const ventsHash = {};

const buildArray = (min, max, val, isXval) => {
    for (let i = min; i <= max; i++) {
        const coordinates = isXval ? val + "," + i : i + "," + val;
        if (!ventsHash[coordinates]) {
            ventsHash[coordinates] = 0;
        }
        ventsHash[coordinates] += 1;
    }
}

const buildListOfPoints = (points) => {
    const { x1, y1, x2, y2 } = points;
    if (x1 === x2) {
        y1 > y2 ? buildArray(y2, y1, x1, false) : buildArray(y1, y2, x1, false);
    } else if (y1 === y2) {
        x1 > x2 ? buildArray(x2, x1, y1, true) : buildArray(x1, x2, y1, true);
    }
}


const createArrayAscending = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}

const createArrayDescending = (min, max) => {
    const arr = [];
    for (let i = max; i >= min; i--) {
        arr.push(i);
    }
    return arr;
}


const getDiagonal = (points) => {
    const { x1, y1, x2, y2 } = points;
    const xArr = x1 <= x2 ? createArrayAscending(x1, x2) : createArrayDescending(x2, x1);
    const yArr = y1 <= y2 ? createArrayAscending(y1, y2) : createArrayDescending(y2, y1);

    if (xArr && yArr && xArr.length === yArr.length) {
        Array.from(Array(xArr.length).keys()).map(idx => {
            const coordinates = yArr[idx] + "," + xArr[idx];
            if (!ventsHash[coordinates]) {
                ventsHash[coordinates] = 0;
            }
            ventsHash[coordinates] += 1;
        });
    }
}


data
    .map(line => line.split("->"))
    .forEach((tokens) => {
        let x1y1 = tokens[0].trim().split(",");
        let x2y2 = tokens[1].trim().split(",");

        const x1 = Number(x1y1[0]);
        const y1 = Number(x1y1[1]);
        const x2 = Number(x2y2[0]);
        const y2 = Number(x2y2[1]);

        buildListOfPoints({
            x1,
            y1,
            x2,
            y2
        });

        getDiagonal({
            x1,
            y1,
            x2,
            y2
        });
    });


console.log(
    Object
        .values(ventsHash)
        .filter(val => val >= 2)
        .length);