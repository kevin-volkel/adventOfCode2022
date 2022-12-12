const testData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`
const testArr = testData.split('\n\n').map( (line) => line.split('\n'));

const data = `Monkey 0:
Starting items: 98, 97, 98, 55, 56, 72
Operation: new = old * 13
Test: divisible by 11
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 1:
Starting items: 73, 99, 55, 54, 88, 50, 55
Operation: new = old + 4
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 6

Monkey 2:
Starting items: 67, 98
Operation: new = old * 11
Test: divisible by 5
  If true: throw to monkey 6
  If false: throw to monkey 5

Monkey 3:
Starting items: 82, 91, 92, 53, 99
Operation: new = old + 8
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 2

Monkey 4:
Starting items: 52, 62, 94, 96, 52, 87, 53, 60
Operation: new = old * old
Test: divisible by 19
  If true: throw to monkey 3
  If false: throw to monkey 1

Monkey 5:
Starting items: 94, 80, 84, 79
Operation: new = old + 5
Test: divisible by 2
  If true: throw to monkey 7
  If false: throw to monkey 0

Monkey 6:
Starting items: 89
Operation: new = old + 1
Test: divisible by 3
  If true: throw to monkey 0
  If false: throw to monkey 5

Monkey 7:
Starting items: 70, 59, 63
Operation: new = old + 3
Test: divisible by 7
  If true: throw to monkey 4
  If false: throw to monkey 3`;
const dataArr = data.split('\n\n').map( (line) => line.split('\n'));

class Monkey {
  constructor(number, items, operation, test, trueMonkey, falseMonkey) {
    this.number = number.split('Monkey ')[1].charAt(0);
    this.items = items.split('Starting items: ')[1].split(', ');
    this.operation = operation.split('Operation: new = old ')[1].split(' ');
    this.test = test.split('Test: divisible by ')[1];
    this.trueMonkey = trueMonkey.charAt(trueMonkey.length - 1);
    this.falseMonkey = falseMonkey.charAt(falseMonkey.length - 1);
    this.inspected = 0;
  }

  inspectNextItem(relief) {
    let item = Number(this.items.shift());
    let [operation, value] = this.operation;
    if(value == 'old') value = item;
    
    switch (operation) {
      case '+':
        item += +value;
        break;
      case '*':
        item *= value;
        break;
      default:
        break;
    } 

    if(relief) item = Math.floor(item / 3);

    this.inspected++;
    if(item % this.test == 0) return [item / this.test, this.trueMonkey];
    return [item / this.test, this.falseMonkey];
  }
}

const createMonkeyArray = (input) => {
  let monkeyArr = [];
  for(let monkey of input) {
    let params = [];
    for(let i = 0; i < monkey.length; i++) {
      params.push(monkey[i])
    }
    monkeyArr.push(new Monkey(...params))
  }
  
  return monkeyArr;
}

const partOne = (input) => {
  let monkeyArr = createMonkeyArray(input);
  
  for(let cycle = 0; cycle < 20; cycle++) {
    for(let monkeyIndex in monkeyArr) {
      let monkey = monkeyArr[monkeyIndex]
      
      let amountOfItems = monkey.items.length;
      for(let i = 0; i < amountOfItems; i++) {
        let [newItem, nextMonkey] = monkey.inspectNextItem(true);
        monkeyArr[nextMonkey].items.push(newItem);
      }
    }
  }

  let inspected = monkeyArr.map( (monkey) => monkey.inspected).sort( (a, b) => b - a);
  return inspected[0] * inspected[1];
}
const partTwo = (input) => {
  let monkeyArr = createMonkeyArray(input);
  
  for(let cycle = 0; cycle < 20; cycle++) {
    for(let monkeyIndex in monkeyArr) {
      let monkey = monkeyArr[monkeyIndex]
      
      let amountOfItems = monkey.items.length;
      for(let i = 0; i < amountOfItems; i++) {
        let [newItem, nextMonkey] = monkey.inspectNextItem(false);
        monkeyArr[nextMonkey].items.push(newItem);
      }
    }
  }

  let inspected = monkeyArr.map( (monkey) => monkey.inspected).sort( (a, b) => b - a);
  return inspected;
}

console.log(partOne(dataArr));
// console.log(partTwo(testArr));

// let monkeyArr = createMonkeyArray(testArr);
// for(let i = 0; i < monkeyArr[0].items.length; i++) {
//   monkeyArr[0].inspectNextItem();
// }
