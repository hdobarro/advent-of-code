const fs = require("fs");

function readInput(file) {
  let input = fs.readFileSync(file, "utf8");
  return input.split("\n");
}

function makeMap(lines) {
  const map = [];

  for (const line of lines) {
    map.push(line.split(""));
  }
  // console.log(map);

  return map;
}

module.exports = { readInput, makeMap };
