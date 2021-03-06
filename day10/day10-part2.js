const fs = require('fs');

const navigationSubsytem = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n");

const points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

const equivalent = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>'
}

const calculatePoints = (complement) => {
    let total = 0;
    let multiplier = 5;
    complement.forEach(letter => {
        total *= multiplier;
        total += points[letter];
    });
    return total;
}

const pushOrPopStack = (stack, letter) => {
    const topOfStack = stack[stack.length - 1];
    letter === equivalent[topOfStack] ? stack.pop() : stack.push(letter);
}

const incompleteLines = navigationSubsytem
    .map(line => line.trim().split(""))
    .map(line => {
        const stack = [];
        line.forEach(letter => pushOrPopStack(stack, letter));
        return stack.filter(char => !equivalent[char]).length ? null : stack;
    })
    .filter(i => i)
    .map(incomplete => incomplete.map(letter => equivalent[letter]).reverse())
    .map(calculatePoints)
    .sort((a, b) => a - b);

console.log(incompleteLines[ Math.floor(incompleteLines.length/2) ]);