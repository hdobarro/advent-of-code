const { readInput } = require("../helper");

const data_test = readInput("./2020/05/input_test");
const data = readInput("./2020/05/input");

// console.log(data_test);
// console.log(data);

console.log("=== Data Test ===");
for (const bp of data_test) {
  console.log(decodeSeatId(bp));
}
console.log("=== Fin Data Test ===");

let highest_id = 0;
let seats_arr = [];
for (const bp of data) {
  const id = decodeSeatId(bp);
  highest_id = highest_id < id ? id : highest_id;
  seats_arr.push(id);
}

seats_arr = seats_arr.sort((a, b) => a - b);

let found = false;
let index = 0;
let my_seat = 0;
while (!found) {
  if (seats_arr[index] === seats_arr[index + 1] - 1) {
    index++;
  } else {
    my_seat = seats_arr[index] + 1;
    found = true;
  }
}

console.log(`Respuesta parte 1: ${highest_id}`);
console.log(`Respuesta parte 2: ${my_seat}`);

function decodeSeatId(boarding_pass) {
  const row = bsp(boarding_pass.slice(0, 7), "F");
  const column = bsp(boarding_pass.slice(7, 10), "L");
  const seat_id = row * 8 + column;

  return seat_id;
}

function bsp(code, lower) {
  const code_arr = Array.from(code);
  const length = Math.pow(2, code_arr.length);

  let space = Array.from({ length: length }, (v, i) => i);

  for (const c of code_arr) {
    let from = 0;
    let to = space.length;

    if (c === lower) {
      to = Math.floor(to / 2);
    } else {
      from = Math.ceil(to / 2);
    }
    space = space.slice(from, to);
  }
  return space[0];
}
