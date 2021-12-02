const fs = require('fs');

const commands = fs.readFileSync('input.txt', 'utf8').split("\n").map(row => {
    return {
        position: row.split(" ")[0].trim(),
        units: Number(row.split(" ")[1].trim())
    }
});;


const positions = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

const calculateCourse = (command, positions) => {
    const { position, units } = command;
    switch (position) {
        case "forward":
            positions.horizontal += units;
            positions.depth += (positions.aim * units);
            break;
        case "down":
            // depth += units;
            positions.aim += units;
            break;
        case "up":
            // depth -= units;
            positions.aim -= units;
            break;
    }
}

commands.forEach(command => calculateCourse(command, positions));
console.log({
    ...positions,
    finalResponse: positions.depth * positions.horizontal
});