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

const pushOrPopStack = (stack, letter) => {
    const topOfStack = stack[stack.length - 1];
    letter === equivalent[topOfStack] ? stack.pop() : stack.push(letter);
}

const corruptsScore = navigationSubsytem
    .map(line => line.trim().split(""))
    .map(line => {
        const stack = [];
        line.forEach(letter => pushOrPopStack(stack, letter));
        const corrupt = stack.filter(char => !equivalent[char])[0];
        return corrupt;
    })
    .filter(i => i)
    .map(corrupt => points[corrupt])
    .reduce((sum, val) => sum + val);

console.log(corruptsScore);