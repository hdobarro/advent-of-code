const { readInput } = require("../helper");

const program = readInput("2020/08/input");

// console.log(program);

const run = (program) => {
  let ip = 0;
  let accumulator = 0;
  let cycle = false;
  const executed = [];

  while (!cycle && ip <= program.length - 1) {
    if (executed[ip]) {
      cycle = true;
    } else {
      executed[ip] = true;
      switch (program[ip].split(" ")[0]) {
        case "nop":
          ip++;
          break;
        case "acc":
          accumulator += parseInt(program[ip].split(" ")[1]);
          ip++;
          break;
        case "jmp":
          ip += parseInt(program[ip].split(" ")[1]);
          break;
      }
    }
  }
  return { accumulator, cycle };
};

const swapInstruction = (program, line) => {
  const [instruction, value] = program[line].split(" ");
  if (instruction === "nop") {
    program[line] = "jmp " + value;
  } else {
    program[line] = "nop " + value;
  }
  return program;
};

const runFix = (program) => {
  const stack = [];
  let find = false;

  for (const [index, line] of program.entries()) {
    const [instruction, value] = line.split(" ");
    if (instruction === "nop" || instruction === "jmp") {
      stack.push(index);
    }
  }

  while (stack.length > 0) {
    const line = stack.pop();

    const modified_program = swapInstruction([...program], line);

    const result = run(modified_program);

    if (!result.cycle) {
      return result.accumulator;
    }
  }
};

const result1 = run(program);
const result2 = runFix(program);
console.log(`Respuesta parte 1: ${result1.accumulator}`);
console.log(`Respuesta parte 2: ${result2}`);
