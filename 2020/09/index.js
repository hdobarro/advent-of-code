const { readInput } = require("../helper");

const data = readInput("./2020/09/input");
const code = data.map((num) => parseInt(num));

const checkXMAS = (numbers) => {
  const number = numbers.pop();

  let found = false;
  let i = 0;
  while (!found && i <= numbers.length) {
    const comp = number - numbers[i];
    const index = numbers.indexOf(comp, i + 1);
    if (index !== -1) {
      found = true;
    }
    i++;
  }
  return { number, found };
};

const preamble = 25;
let invalid_number = -1;

for (let i = preamble; i < code.length; i++) {
  const result = checkXMAS(code.slice(i - preamble, i + 1));

  if (!result.found) {
    invalid_number = result.number;
  }
}

let sum_arr = [];

for (let i = 0; i <= code.length; i++) {
  let sum = code[i];
  for (let j = i + 1; j <= code.length; j++) {
    sum += code[j];

    if (sum === invalid_number) {
      sum_arr = code.slice(i, j + 1).sort((a, b) => a - b);
    }
    if (sum > invalid_number) {
      break;
    }
  }
}

console.log(`Respuesta parte 1: ${invalid_number}`);
console.log(`Respuesta parte 2: ${sum_arr[0] + sum_arr[sum_arr.length - 1]}`);
