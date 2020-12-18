const { readInput, makeMap } = require("../helper");

const lines = readInput("2020/11/input");
const seats_map = makeMap(lines);

const get_adyacents = (map, row, col) => {
  const ady = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const row_ady = row + i;
      const col_ady = col + j;
      if (
        0 <= row_ady &&
        row_ady <= map.length - 1 &&
        0 <= col_ady &&
        col_ady <= map[0].length - 1 &&
        !(i === 0 && j === 0)
      ) {
        ady.push(map[row_ady][col_ady]);
      }
    }
  }
  return ady;
};

const get_adyacents2 = (map, row, col) => {
  const ady = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let row_ady = row + i;
      let col_ady = col + j;
      if (!(i === 0 && j === 0)) {
        while (
          0 <= row_ady &&
          row_ady <= map.length - 1 &&
          0 <= col_ady &&
          col_ady <= map[0].length - 1
        ) {
          if (map[row_ady][col_ady] !== ".") {
            ady.push(map[row_ady][col_ady]);
            break;
          } else {
            row_ady += i;
            col_ady += j;
          }
        }
      }
    }
  }
  return ady;
};

const apply_rules = (seat, adyacents, num_occ) => {
  let new_state = seat;
  switch (seat) {
    case "L":
      if (adyacents.every((ady) => ady === "L")) {
        new_state = "#";
      }
      break;
    case "#":
      const occ = adyacents.reduce((acc, ady) => {
        ady === "#" ? (acc += 1) : acc;
        return acc;
      }, 0);
      if (occ >= num_occ) {
        new_state = "L";
      }
      break;
  }
  return new_state;
};

const run_round = (map) => {
  const new_map = map.map((m) => [...m]);
  for (let i = 0; i <= map.length - 1; i++) {
    for (let j = 0; j <= map[0].length - 1; j++) {
      if (map[i][j] !== ".") {
        const seat = map[i][j];
        const adyacents_seats = get_adyacents(map, i, j).filter(
          (s) => s !== "."
        );
        const seat_state = apply_rules(seat, adyacents_seats, 4);
        new_map[i][j] = seat_state;
      }
    }
  }
  return new_map;
};

const run_round2 = (map) => {
  const new_map = map.map((m) => [...m]);
  for (let i = 0; i <= map.length - 1; i++) {
    for (let j = 0; j <= map[0].length - 1; j++) {
      if (map[i][j] !== ".") {
        const seat = map[i][j];
        const adyacents_seats = get_adyacents2(map, i, j);
        const seat_state = apply_rules(seat, adyacents_seats, 5);
        new_map[i][j] = seat_state;
      }
    }
  }
  return new_map;
};

const equal_maps = (initial_map, new_map) => {
  return initial_map.every((r, i) => r.every((c, j) => c === new_map[i][j]));
};

const number_occ = (result_iterations) => {
  return result_iterations.reduce((acc, r) => {
    acc += r.reduce((acc2, c) => {
      c === "#" ? (acc2 += 1) : acc2;
      return acc2;
    }, 0);
    return acc;
  }, 0);
};

let iterations = run_round(seats_map);
let equals = equal_maps(seats_map, iterations);
while (!equals) {
  const prev = iterations.map((r) => [...r]);
  iterations = run_round(iterations);
  equals = equal_maps(prev, iterations);
}

let iterations2 = run_round2(seats_map);
let equals2 = equal_maps(seats_map, iterations2);
while (!equals2) {
  const prev = iterations2.map((r) => [...r]);
  iterations2 = run_round2(iterations2);
  equals2 = equal_maps(prev, iterations2);
}

console.log(`Respuesta parte 1: ${number_occ(iterations)}`);
console.log(`Respuesta parte 2: ${number_occ(iterations2)}`);
