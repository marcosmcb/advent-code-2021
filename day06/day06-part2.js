const fs = require('fs');

const NUM_DAYS = 256;
const FISH_MAX_AGE = 9;

const data = fs.readFileSync('input.txt', 'utf8').split(",").map(line => Number(line.trim()));

const fishPack = {};
const toArray = (num) => [...Array(num).keys()];

toArray(FISH_MAX_AGE).forEach(age => fishPack[age] = 0);

data.forEach(fish => fishPack[fish] += 1);

toArray(NUM_DAYS).forEach(_ => {
    let babyFishes = 0;
    toArray(FISH_MAX_AGE).forEach(age => {
        if (age === 0) {
            babyFishes = fishPack[age];
            fishPack[age] = 0;
        } else {
            fishPack[age - 1] += fishPack[age];
            fishPack[age] = 0;

            const isRebornOrBaby = (age === 6) || (age === 8);
            fishPack[age] += isRebornOrBaby ? babyFishes : 0;
        }
    });
});


console.log(Object.values(fishPack).reduce((sum, total) => sum + total));