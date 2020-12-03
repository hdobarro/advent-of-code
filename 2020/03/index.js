const { readInput, makeMap } = require("../helper");

const data = readInput("input");
const map = makeMap(data);

const count3x1 = howManyTreesWithSlope(map, 3, 1);

const count1x1 = howManyTreesWithSlope(map, 1, 1);
const count5x1 = howManyTreesWithSlope(map, 5, 1);
const count7x1 = howManyTreesWithSlope(map, 7, 1);
const count1x2 = howManyTreesWithSlope(map, 1, 2);

const total = count1x1 * count3x1 * count5x1 * count7x1 * count1x2;

console.log(`Respuesta parte 1: ${count3x1}`);
console.log(`Respuesta parte 2: ${total}`);

function howManyTreesWithSlope(map, right, down) {
  let pos_r = 0;
  let pos_d = 0;
  let trees = 0;

  const map_height = map.length;
  const map_widht = map[0].length;

  pos_r = (pos_r + right) % map_widht;
  pos_d += down;

  while (pos_d <= map_height - 1) {
    if (map[pos_d][pos_r] == "#") {
      trees++;
    }
    pos_d += down;
    pos_r = (pos_r + right) % map_widht;
  }
  return trees;
}
