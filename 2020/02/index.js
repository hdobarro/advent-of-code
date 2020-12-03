// import { readInput } from "../helper";
const { readInput } = require("../helper");

let data = readInput("input");
let valids1 = 0;
let valids2 = 0;

for (let r of data) {
  let long, char, pass;
  [long, char, pass] = r.split(" ");

  long = long.split("-");
  char = char.slice(0, -1);
  if (isValidPass1(long, char, pass)) {
    valids1++;
  }
  if (isValidPass2(long, char, pass)) {
    valids2++;
  }
}

console.log(`Respuesta parte 1: ${valids1}`);
console.log(`Respuesta parte 2: ${valids2}`);

function isValidPass1(long, char, pass) {
  const re = new RegExp(char, "g");
  let occurr = (pass.match(re) || []).length;
  if (occurr >= long[0] && occurr <= long[1]) {
    return true;
  }
  return false;
}

function isValidPass2(long, char, pass) {
  if ((pass[long[0] - 1] == char) != (pass[long[1] - 1] == char)) {
    return true;
  }
  return false;
  //console.log(pass[long[0] - 1], pass[long[1] - 1]);
}
