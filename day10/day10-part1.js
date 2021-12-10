const fs = require('fs');

const navigationSubsytem = fs
    .readFileSync('sample.txt', 'utf8')
    .split("\n");

const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const equivalent = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>'
}

const pushOrPopQueue = (queue, letter) => {
    const topOfQueue = queue[queue.length - 1];
    letter === equivalent[topOfQueue] ? queue.pop() : queue.push(letter);
}

const corruptsScore = navigationSubsytem
    .map(line => line.trim().split(""))
    .map(line => {
        const queue = [];
        line.forEach(letter => pushOrPopQueue(queue, letter));
        const corrupt = queue.filter(char => !equivalent[char])[0];
        return corrupt;
    })
    .filter(i => i)
    .map(corrupt => points[corrupt])
    .reduce((sum, val) => sum + val);

console.log(corruptsScore);