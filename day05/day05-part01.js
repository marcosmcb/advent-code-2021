const fs = require('fs');

const data = fs.readFileSync('sample.txt', 'utf8').split("\n");

const ventsHash = {};

const buildArray = (min, max, val, isXval) => {
    for (let i = min; i <= max; i++) {
        const coordinates = isXval ?  val + "," + i : i + "," + val;
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

data
    .map(line => line.split("->"))
    .forEach((tokens) => {
        let x1y1 = tokens[0].trim().split(",");
        let x2y2 = tokens[1].trim().split(",");

        const x1 = Number(x1y1[0]);
        const y1 = Number(x1y1[1]);
        const x2 = Number(x2y2[0]);
        const y2 = Number(x2y2[1]);

        if (x1 !== x2 && y1 !== y2) return;

        buildListOfPoints({
            x1,
            y1,
            x2,
            y2
        });
    });

console.log(ventsHash)
console.log(Object.values(ventsHash).filter(val => val >= 2).length);