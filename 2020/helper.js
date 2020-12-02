const fs = require("fs");

function readInput(file) {
  let input = fs.readFileSync(file, "utf8");
  return input.split("\n");
}

module.exports = readInput;
