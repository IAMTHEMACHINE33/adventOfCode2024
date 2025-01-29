import fs from "fs";

// Read The Text File
const puzzle = fs.readFileSync("./day01/puzzle.txt")
const {first_column_arr, second_column_arr} = transformPuzzle(puzzle);
task01()
task02()

function task02() {
    const final_answer = first_column_arr.reduce((acc, ele, ind) => {
	const final = acc + (second_column_arr.filter((ele2, ind) => ele === ele2 ).length * ele);
	return final;
    });
    console.log('from day 01 TASK 2', final_answer);
    return final_answer;
}

function task01 () {
    const final_answer = first_column_arr.reduce((acc, ele, ind) => {
	const value = Math.abs(ele - second_column_arr[ind]) + acc;
	return value;
    })

    console.log('from day 01 TASK 1', final_answer);
    return final_answer;
}

function transformPuzzle (puzzle: Buffer) {

    const first_column_arr: number[]= [];
    const second_column_arr: number[] = [];

    puzzle
    .toString('utf-8')
    .split('\n')
    .forEach((element: string)=> {
	first_column_arr.push(+(element.split(' ')[0]))
	second_column_arr.push(+(element.split(' ').pop() ?? 0))
    })

    return { first_column_arr: first_column_arr.sort(), second_column_arr: second_column_arr.sort() };
}
