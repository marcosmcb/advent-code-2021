const fs = require('fs');

let fishes = fs.readFileSync('sample.txt', 'utf8').split(",").map(line => Number(line.trim()));

const NUM_DAYS = 80;

for (let i=0; i < NUM_DAYS; i++) {
    let newFishes = [];
    fishes = fishes.map(fishTimer => {
        if (fishTimer === 0) {
            newFishes.push(8);
            return 6;
        }
        return fishTimer-1;
    })
    .concat(newFishes);
}
console.log(fishes.length);