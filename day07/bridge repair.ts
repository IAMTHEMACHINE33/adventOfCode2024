import fs from "fs"

const puzzle = fs.readFileSync('./day07/puzzle.txt', 'utf-8')

// Split Each line
const lines = puzzle.split('\n').filter(ele => ele)

// Get Each Line
const task01 = lines.map(ele => {
    //Split With :
    const {out, inp} = transformLine(ele)
    const percom = rec(inp)
    if (percom.includes(out)) return out;
    return 0;
}).reduce((acc, ele) => acc+ele, 0)

const task02 = lines.map(ele => {
    //Split With :
    const {out, inp} = transformLine(ele)
    const percom = rec(inp, true)
    if (percom.includes(out)) return out;
    return 0;
}).reduce((acc, ele) => acc+ele, 0)

console.log('from day 07 Task01', task01)
console.log('from day 07 Task02',task02)
function transformLine (ele: string) {
    const outinp = ele.split(':')
    const out = +outinp[0]
    const inp = outinp[1].split(' ').map(ele => +ele).filter(ele => ele)
    return {out, inp}
}
const numbers = [6, 8, 6, 15]
//console.log(add(numbers))
//console.log(rec(numbers))

function rec (nums: number[], conc:boolean = false):number[] {
    if (nums.length === 0) {
	return []
    }
    if (nums.length === 1) {
	return [nums[0]]
    }
    const popped = nums.pop()
    //console.log('popped',popped)
    const recursion = rec(nums,conc)
    const add = recursion.map((ele) => ele + popped!)
    const mul = recursion.map((ele) => ele * popped!) 
    let concat
    if (conc) {concat = recursion.map((ele) => +`${ele}${popped!}`)}
    return [...add, ...mul, ...(conc ? concat!: [])]
}
