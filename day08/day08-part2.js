const fs = require('fs');

const lengthToDigit = {
    2: 1,
    4: 4,
    3: 7,
    7: 8
}

const findNumInFamily = (digitFamily, numToJoin, equalTo ) => {
    return digitFamily
        .filter(digits => new Set([...numToJoin, ...digits.split("")]).size === equalTo)
        .pop();
}

const hasMatch = (arr, needle) => {
    return arr.every(el => needle.split("").includes(el));
}


const tryDeduce = (digit, digitFamily, knownDigits) => {
    const digitsSplit = digit.split("");
    const num4 = knownDigits.filter(digit => digit.length === 4).pop().split("");
    const num1 = knownDigits.filter(digit => digit.length === 2).pop().split("");

    if (digitsSplit.length === 6) {
        const num6 = findNumInFamily(digitFamily, num1, 7);  
        if ( hasMatch(digitsSplit, num6) ) return 6; 

        const num9 = findNumInFamily(digitFamily, num4, 6);
        if (hasMatch(digitsSplit, num9)) return 9;

        return 0;
    }

    if (digitsSplit.length === 5) {
        const num3 = findNumInFamily(digitFamily, num1, 5);
        if (hasMatch(digitsSplit, num3)) return 3;

        const num2 = findNumInFamily(digitFamily, num4, 7);
        if (hasMatch(digitsSplit, num2)) return 2;

        return 5;
    }
}


const signals = fs.readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(line => {
        const output = line.split("|")[1].trim().split(" ");
        const signalPatterns = line.split("|")[0].trim().split(" ");

        const response = output.map(digit => {
            let digitFound = lengthToDigit[digit.length];
            if (!digitFound) {
                const digitFamily = signalPatterns.filter(pattern => pattern.length === digit.length);
                const knownDigits = signalPatterns.filter(digits => lengthToDigit[digits.length]);

                digitFound = tryDeduce(digit, digitFamily, knownDigits);
            }
            return digitFound;
        });
        return Number(response.join(""));
    }).reduce((sum, val) => sum + Number(val));

console.log(signals);