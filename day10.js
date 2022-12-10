const test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
const testArr = test.split('\n');

const data = `addx 1
noop
addx 29
addx -24
addx 4
addx 3
addx -2
addx 3
addx 1
addx 5
addx 3
addx -2
addx 2
noop
noop
addx 7
noop
noop
noop
addx 5
addx 1
noop
addx -38
addx 21
addx 8
noop
addx -19
addx -2
addx 2
addx 5
addx 2
addx -12
addx 13
addx 2
addx 5
addx 2
addx -18
addx 23
noop
addx -15
addx 16
addx 7
noop
noop
addx -38
noop
noop
noop
noop
noop
noop
addx 8
addx 2
addx 3
addx -2
addx 4
noop
noop
addx 5
addx 3
noop
addx 2
addx 5
noop
noop
addx -2
noop
addx 3
addx 6
noop
addx -38
addx -1
addx 35
addx -6
addx -19
addx -2
addx 2
addx 5
addx 2
addx 3
noop
addx 2
addx 3
addx -2
addx 2
noop
addx -9
addx 16
noop
addx 9
addx -3
addx -36
addx -2
addx 11
addx 22
addx -28
noop
addx 3
addx 2
addx 5
addx 2
addx 3
addx -2
addx 2
noop
addx 3
addx 2
noop
addx -11
addx 16
addx 2
addx 5
addx -31
noop
addx -6
noop
noop
noop
noop
noop
addx 7
addx 30
addx -24
addx -1
addx 5
noop
noop
noop
noop
noop
addx 5
noop
addx 5
noop
addx 1
noop
addx 2
addx 5
addx 2
addx 1
noop
noop
noop
noop`;
const dataArr = data.split('\n');

const partOne = (input) => {
  let index = 0;
  let total = 1;
  let tests = [20, 60, 100, 140, 180, 220];
  let signals = [];

  let buffer = false;
  for(let cycle = 1; cycle < 221; cycle++) {
    let nextIndex = false;

    let line = input[index];
    let command = line.split(' ')[0];
    if(tests.includes(cycle)) signals.push(total * cycle);
    
    if(command == 'noop' && !buffer) {
      nextIndex = true;
    } else {
      if(!buffer) {
        buffer = true;
      } else {
        let value = line.split(' ')[1];
        total += +value;
        nextIndex = true;
        buffer = false;
      }
    }

    if(nextIndex) index++;
  }

  return signals.reduce((curr, total) => curr + total);
}

const partTwo = (input) => {
  let index = 0;
  let total = 1;
  let output = [];

  let buffer = false;
  let row = '';
  for(let cycle = 1; index < input.length; cycle++) {
    let nextIndex = false;
    let line = input[index];
    let command = line.split(' ')[0];
    
    let spritePositions = [total - 1, total, +total +1];
    let column = cycle - (Math.floor(cycle / 40) * 40) - 1;

    row += (spritePositions.includes(column)) ? '#' : '.'

    if(command == 'noop' && !buffer) {
      nextIndex = true;
    } else {
      if(!buffer) {
        buffer = true;
      } else {
        let value = line.split(' ')[1];
        total += +value;
        nextIndex = true;
        buffer = false;
      }
    }
    
    if(nextIndex) index++;
    if(cycle % 40 == 0) {
      output.push(row);
      row = '';
    }
  }

  return output;
}

console.log(partOne(dataArr));
console.log(partTwo(dataArr));