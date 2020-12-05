const { readInput } = require("../helper");

const data = readInput("input");
const passports = toArrayObjects(data);

const count_valids = countValidPassports(passports);

console.log(`Respuesta parte 1: 208`);
console.log(`Respuesta parte 2: ${count_valids}`);

function toArrayObjects(input) {
  const passports = [];
  let passport = {};

  for (const line of input) {
    if (line !== "") {
      let pairs = line.split(" ");
      for (const pair of pairs) {
        let field = pair.split(":");
        passport[field[0]] = field[1];
      }
    } else {
      passports.push(passport);
      passport = {};
    }
  }

  if (Object.keys(passport).length !== 0) {
    passports.push(passport);
    passport = {};
  }

  return passports;
}

function countValidPassports(passports) {
  let valids = 0;
  for (const passport of passports) {
    if (isValid(passport)) {
      valids++;
    }
  }
  return valids;
}

function isValid(passport) {
  const required_fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    // "cid",
  ];
  for (const rf of required_fields) {
    if (!(rf in passport)) {
      return false;
    } else {
      if (!isValidValue(rf, passport[rf])) {
        return false;
      }
    }
  }
  return true;
}

function isValidValue(field, value) {
  const valid_values = {
    byr: "^(19[02-9][0-9]|200[0-2])$",
    iyr: "^(201[0-9]|2020)$",
    eyr: "^(202[0-9]|2030)$",
    hgt: "^(1([5-8][0-9]|9[01-3])cm)|((59|6[0-9]|7[01-6])in)$",
    hcl: "^#[0-9a-f]{6}$",
    ecl: "^(amb|blu|brn|gry|grn|hzl|oth)$",
    pid: "^[0-9]{9}$",
  };

  const re = new RegExp(valid_values[field]);
  if (re.test(value)) {
    return true;
  }
  return false;
}
