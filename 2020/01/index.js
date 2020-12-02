let fs = require("fs");

const data = readInput("input");
const NUM = 2020;

let i = 0;
let value;
let to_find;
let result;
let find = false;
while (i <= data.length - 1 && !find) {
  value = data[i];
  to_find = NUM - value;
  if (data.includes(to_find)) {
    result = value * to_find;
    find = true;
  }
  i++;
}

let result2;
for (let i = 0; i <= data.length - 1; i++) {
  for (let j = 0; j <= data.length - 1; j++) {
    for (let k = 0; k <= data.length - 1; k++) {
      if (i != j && i != k && j != k) {
        let suma = data[i] + data[j] + data[k];
        if (suma == NUM) {
          result2 = data[i] * data[j] * data[k];
        }
      }
    }
  }
}

console.log(`Respuesta parte 1: ${result}`);
console.log(`Respuesta parte 2: ${result2}`);

function readInput(file) {
  let input = fs.readFileSync(file, "utf8");
  input = input.split("\n");

  let data = [];
  input.forEach(function (value) {
    if (value !== "") {
      data.push(parseInt(value, 10));
    }
  });
  return data;
}
