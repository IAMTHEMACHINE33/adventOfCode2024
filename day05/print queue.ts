import fs from "fs"

const puzzle = fs.readFileSync('./day05/puzzle.txt').toString('utf-8').split('\n\n')
const first_list = puzzle[0]
const second_list = puzzle[1]

interface Iobj extends Object{
    [fronter: number] : number[]
}
const obj: Iobj = {}
first_list
.split('\n')
.forEach((ele) => Object
	 .keys(obj)
	 .includes(splitList(ele, 0).toString())
	     ? obj[splitList(ele, 0)].push(splitList(ele, 1)) 
	     : obj[splitList(ele, 0)] = [splitList(ele, 1)])

const s =second_list
.split('\n')
.map((ele) => stringToNumArr(ele))

const checkCorrectOrder = checkOrder(s)
const correctOrderSum = sum(midPointFromIndexes(s, getOrder(checkOrder(s), true)))

const incorrectOrder = fixOrder(getOrder(checkOrder(s), false))
const incorrectOrderSum = sum(midPointFromIndexes(incorrectOrder, getOrder(checkOrder(incorrectOrder),true)))

console.log('from day 05 Task01', correctOrderSum);
console.log('from day 05 Task02', incorrectOrderSum);

function fixOrder(indexes: number[]) {
    // Check Which Has Most Amongst It 
    const originalArr = indexes
    .map(ele => s[ele])

    const highestOrder = originalArr
    .map(ele => {
	return ele
	.map(ele1 => {
	    return ele
	    .map(ele2 => obj[ele1]?.includes(ele2))
	    .filter(ele2 => ele2).length
	})
    })

    // Re Arrange Desc 
    highestOrder
    const fixedArr = highestOrder
    .map((ele, ind) => ele
	 .map((ele1, ind1) => {
	     return originalArr[ind][highestOrder[ind].indexOf(ind1)]
	 }).reverse())
    return fixedArr 
}

function checkOrder(listOfNumArr: number[][]) {
    return listOfNumArr.map((ele) => {
	return ele.map((ele1, ind) => {
	    if (ele.length < 1) return false
		return ele.every((ele2, ind1) => 
				 (Object.hasOwn(obj, ele1) &&
				  obj[ele1]?.includes(ele2) 
				 ) ||
				     (ind1 <= ind)
				) 	   
	}
		      ).every((ele1) => ele1)
    })

}

function getOrder(includesOrNah: boolean[], correct: boolean) {
    return includesOrNah.map((ele, ind) => {
	if (correct)
	    if (ele)
		return ind;
	if (!correct)
	    if (!ele)
		return ind;
    }).filter((ele)=> ele !== undefined);
    console.log()
}

function midPointFromIndexes(listOfNumArr: number[][], indexes: number[]) {
    return indexes.map((ele) => listOfNumArr[ele].at(Math.floor(listOfNumArr[ele].length/2)))
}

function sum(arrayOfNumber?: (number | undefined)[]) {
    if (!arrayOfNumber) return 0
    return arrayOfNumber
    .reduce((acc, ele) => acc !== undefined && ele !== undefined  ? acc+ele : 0, 0)
}

function splitList (ele:string, ind:number): number{
    return +ele.split('|')[ind];
}

function stringToNumArr (ele: string) {
    return ele.split(',').map((ele1) => +ele1)
}
