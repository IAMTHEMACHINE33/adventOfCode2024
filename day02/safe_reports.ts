import fs from "fs"

const puzzle = fs.readFileSync("./day02/puzzle.txt")
const safe_report = puzzle
.toString("utf-8")
.split('\n')
.map((ele) => ele.split(' ').map((ele1) => +ele1))
.reduce((acc: number[], ele: number[], ind: number) => {
    const increasing = (ele[0] - ele[1]) < 0 ?true : false;
    const final = ele
    .every((ele1, ind1) =>  
	   ind1 === ele.length - 1 || 
	   [1, 2, 3].includes(
	       increasing
		   ? ele[ind1 + 1] - ele1 
		   : ele1 - ele[ind1 + 1])  
	  )

    acc.push(final && ele.length > 1?1 :0)
    return acc;
})
.filter((ele) => ele === 1)
.length

console.log('from day 02 TASK 1', safe_report)
