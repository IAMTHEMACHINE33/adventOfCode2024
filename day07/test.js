// Part 1
const {readFileSync }= require('fs');
const path = './day07/trial.txt'
let lines = readFileSync(path, "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number));

const OPS = [(a, b) => (a % b === 0 ? a / b : -1), (a, b) => a - b];

function evalsTo(nums, cur, i = nums.length - 1) {
  if (!i) return cur === nums[0];
  if (cur < 0) return false;

  return OPS.some((func) => evalsTo(nums, func(cur, nums[i]), i - 1));
}

function part1(lines) {
  let filtered = lines
    .filter(([target, ...equation]) => evalsTo(equation, target))
    .map(([total]) => total)
    .reduce((acc, ele) => acc + ele)
    ;
    
  console.log(filtered);
}

// part1(lines);

// Part 2

function part2(lines) {
  let unconcat = (x, y) => {
    let [sub, yMag] = [x - y, 10 ** (Math.floor(Math.log10(y)) + 1)];
    return sub > 0 && sub % yMag === 0 ? sub / yMag : -1;
  };

  OPS.push(unconcat);
  part1(lines);
}

part2(lines);
