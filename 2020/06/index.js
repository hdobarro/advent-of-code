const { readInput } = require("../helper");

const data = readInput("2020/06/input");

const yes_arr = [];
const yes_arr_g = [];
let aux_arr = [];
let aux_arr_g = [];
for (const line of data) {
  if (line !== "") {
    aux_arr = aux_arr.concat(line.split(""));
    aux_arr_g.push(line.split(""));
  } else {
    yes_arr.push(new Set(aux_arr));
    yes_arr_g.push(aux_arr_g);
    aux_arr = [];
    aux_arr_g = [];
  }
}
if (aux_arr.length !== 0) {
  yes_arr.push(new Set(aux_arr));
  yes_arr_g.push(aux_arr_g);
}

const reducer = (acc, cv) => acc + cv.size;
const yes_sum = yes_arr.reduce(reducer, 0);
console.log(`Respuesta parte 1: ${yes_sum}`);

console.time("Parte 2");
const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

let count = 0;
for (const g of yes_arr_g) {
  const yes_cart = cartesian(...g);
  const yes_g = yes_cart.map((c) => new Set(c)).filter((s) => s.size == 1);
  count += yes_g.length;
}

console.log(`Respuesta parte 2: ${count}`);
console.timeEnd("Parte 2");
