import fs from "fs"

const identifier_for_dont = 'nocontinue'
const identifier_for_do = 'yescontinue'
const regex_dont = new RegExp(`${identifier_for_dont}`)

const puzzle: number = fs.readFileSync("./day03/puzzle.txt")
.toString('utf-8')
.replaceAll('do()',`do()${identifier_for_do}`)
.replaceAll('don\'t()',`don\'t()${identifier_for_dont}`)
.split(/do(n't)?\(\)/)
.filter((ele) => ele && !ele.match(regex_dont))
.join('')
// Task 01
.split('mul(')
.map((ele: string) => ele.substring(0, ele.indexOf(')')).split(',').map((ele1) => +ele1))
.filter((ele: number[]) => ele.length === 2)
.map((ele: number[]) => multiply(ele))
.reduce((acc: number, ele: number) => acc + ele, 0)

function multiply(multiplee: number[]) {
    if (Number.isNaN(multiplee[0]) || Number.isNaN(multiplee[1]))
	return 0;

    if (multiplee[0] < 0 || multiplee[0] > 999 ||
    multiplee[1] < 0 || multiplee[1] > 999
       )
	return 0;

    return multiplee[0] * multiplee[1];
}

console.log('from day 03', puzzle);
