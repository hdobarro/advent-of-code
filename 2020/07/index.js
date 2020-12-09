const { readInput } = require("../helper");

const data = readInput("./2020/07/input");

const make_ady_list = (input) => {
  const re = /(?<color>[\w]+ [\w]+) bags contain (?:(?<cantidad1>[\d]+) (?<color1>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad2>[\d]+) (?<color2>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad3>[\d]+) (?<color3>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad4>[\d]+) (?<color4>[\w]+ [\w]+) bags?[.|,])?/;

  const list = {};

  for (const line of input) {
    const color = line.match(re);

    c = color.groups.color;
    c1 = color.groups.color1;
    c2 = color.groups.color2;
    c3 = color.groups.color3;
    c4 = color.groups.color4;

    if (c1 !== undefined) {
      if (list[c1] !== undefined) {
        list[c1] = list[c1].concat([c]);
      } else {
        list[c1] = [c];
      }
    }
    if (c2 !== undefined) {
      if (list[c2] !== undefined) {
        list[c2] = list[c2].concat([c]);
      } else {
        list[c2] = [c];
      }
    }
    if (c3 !== undefined) {
      if (list[c3] !== undefined) {
        list[c3] = list[c3].concat([c]);
      } else {
        list[c3] = [c];
      }
    }
    if (c4 !== undefined) {
      if (list[c4] !== undefined) {
        list[c4] = list[c4].concat([c]);
      } else {
        list[c4] = [c];
      }
    }
  }
  return list;
};

const make_ady_list2 = (input) => {
  const re = /(?<color>[\w]+ [\w]+) bags contain (?:(?<cantidad1>[\d]+) (?<color1>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad2>[\d]+) (?<color2>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad3>[\d]+) (?<color3>[\w]+ [\w]+) bags?[.|,])?(?: (?<cantidad4>[\d]+) (?<color4>[\w]+ [\w]+) bags?[.|,])?/;

  const list = new Map();

  for (const line of input) {
    const color = line.match(re);

    const c = color.groups.color;

    list.set(c, new Map());

    if (color.groups.color1) {
      list.get(c).set(color.groups.color1, color.groups.cantidad1);
    }
    if (color.groups.color2) {
      list.get(c).set(color.groups.color2, color.groups.cantidad2);
    }
    if (color.groups.color3) {
      list.get(c).set(color.groups.color3, color.groups.cantidad3);
    }
    if (color.groups.color4) {
      list.get(c).set(color.groups.color4, color.groups.cantidad4);
    }
  }
  return list;
};

const get_count_contain = (list_v, v) => {
  const queue = [];
  const visited = new Map();

  queue.unshift(v);

  while (queue.length > 0) {
    const current = queue.pop();
    visited.set(current, true);

    const edges = list_v[current];

    if (edges !== undefined) {
      for (const e of edges) {
        if (!visited.get(e)) {
          queue.unshift(e);
        }
      }
    }
  }
  return visited.size;
};

const get_count_contain2 = (list_v, v, count = 1) => {
  const edges = list_v.get(v);
  edges.forEach((v, k) => {
    count += v * get_count_contain2(list_v, k);
  });
  return count;
};

const list_v = make_ady_list(data);
const result = get_count_contain(list_v, "shiny gold");

const list_v2 = make_ady_list2(data);
const result2 = get_count_contain2(list_v2, "shiny gold");

console.log(`Respuesta parte 1: ${result - 1}`);
console.log(`Respuesta parte 2: ${result2 - 1}`);
