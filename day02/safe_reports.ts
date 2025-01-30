import fs from "fs"

const final: number[][] = []
const puzzle = fs.readFileSync("./day02/puzzle.txt")
const safe_report = puzzle
.toString("utf-8")
.split('\n')
.map((ele) => ele.split(' ').map((ele1) => +ele1))
.reduce((acc: number[], ele: number[], ind: number) => {
    const difference_arr = getDifferenceArr(ele)

    // Task 02
    const increasing_cb = (ele1: number) => ele1 <= 0
    const for_increasing = checkValidation(difference_arr, increasing_cb)

    const decreasing_cb = (ele1: number) => ele1 >= 0
    const for_decreasing = checkValidation(difference_arr, decreasing_cb)

    if (for_increasing.status) removeUnwanted(ele, figureOutIndex(ele, for_increasing.index))
    
    else if (for_decreasing.status) removeUnwanted(ele, figureOutIndex(ele, for_decreasing.index))

    // Task 01
    if(checkFinished(getDifferenceArr(ele))) acc.push(1)
    else acc.push(0)

    return acc;
}, [0])
.filter((ele) => ele === 1)
.length


console.log('from day 02', safe_report);
function figureOutIndex (ele: number[], reported_index: number) {
    const cloneEle = structuredClone(ele)
    removeUnwanted(cloneEle, reported_index)	
    if (checkFinished(getDifferenceArr(cloneEle)))
	return reported_index
    else return reported_index - 1	
}
function checkValidation (difference_arr: number[], callback: (ele1:number) => boolean) {
	let output = {status: false, index: -1}

	if ( difference_arr.findIndex(callback) === -1 && 
	    difference_arr.findIndex((ele1) => Math.abs(ele1) <= 0 || Math.abs(ele1) > 3) === -1) {
	    return output;
	};
	if (
	    difference_arr.findIndex(callback) ===
	    difference_arr.findLastIndex(callback) && difference_arr.findIndex(callback) !== -1
	)
	{
	    // Remove From That Index
	    output.index = difference_arr.findIndex(callback) +  1
	    output.status = true
	}
	// CHECK DIFFERENCE Has to be less than abs 3
	else if (
	    difference_arr.findIndex(callback) === -1 &&
	    difference_arr.findIndex((ele1) => Math.abs(ele1) <= 0 || Math.abs(ele1) > 3) ===
	    difference_arr.findLastIndex((ele1) => Math.abs(ele1) <= 0 || Math.abs(ele1) > 3) 
	) {
	    output.index = difference_arr.findIndex((ele1) => Math.abs(ele1) > 3 || Math.abs(ele1) <= 0) + 1
	    output.status = true
	}
    
    return output;
}

function checkFinished (difference_arr: number[]) {
    if ( difference_arr.length > 1 && 
	 difference_arr.every((ele1) => [1, 2, 3].includes(Math.abs(ele1))) &&
	(difference_arr.every((ele1) => ele1 > 0) || difference_arr.every((ele1) => ele1 < 0))) {
	return true;
    };
    return false
}

function removeUnwanted (difference_arr: number[], index: number) {
    difference_arr.splice(index, 1)
}

function getDifferenceArr (ele: number[]){
    const difference_arr = ele.map((ele2, ind2) => ele2 - ele[ind2 + 1] )
    .splice(0, ele.length - 1)
    return difference_arr
}
