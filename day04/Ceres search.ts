import fs from 'fs';

const puzzle : any = fs.readFileSync("./day04/puzzle.txt")
.toString("utf-8")

const fc = /X/g 
const sc = /M/g
const tc = /A/g
const foc = /S/g
const regexp = /XMAS/g
const regexp1 = /SAMX/g

// For Vector
const horizontal_num = [...puzzle.matchAll(regexp)].map((ele: RegExpExecArray) => {
    return ele[0]
}).length
const horizontal_num1 = [...puzzle.matchAll(regexp1)].map((ele: RegExpExecArray) => {
    return ele[0]
}).length

// For Matrix
const matrix = puzzle
.split('\n')


let counter = horizontal_num + horizontal_num1;
let second_counter =  0;
const matrix_num = matrix
.forEach((ele: string, ind: number) => {

    const vertical_num_a = search_over(ele, ind, fc, true)
    const vertical_num_b = search_over(ele, ind, foc, false)
    counter += (vertical_num_a + vertical_num_b)

    const vertical_diag = search_over1(ele, ind, tc)
    second_counter += vertical_diag

})

function search_over (ele: string, ind: number, regex: RegExp, straight: boolean) {
    const vertical: number = matchWithRegex(ele, regex)
    .map((ele1: RegExpExecArray, index: number) => vertical_check(ele, ele1, index, ind, straight))
    .filter((ele1) => ele1)
    .reduce((acc:number, ele:number) => acc + ele, 0);

    return vertical
}

function matchWithRegex(ele: string, regex: RegExp) {
    return [...ele.matchAll(regex)];
}

function search_over1 (ele: string, ind: number, regex: RegExp) {
    const vertical: number = matchWithRegex(ele, regex)
    .map((ele1: RegExpExecArray, index: number) => vertical_only_diagnal_check(ele, ele1, index, ind))
    .filter((ele1) => ele1)
    .reduce((acc:number, ele:number) => acc + ele, 0);

    return vertical
}
function vertical_only_diagnal_check(line: string, ele: RegExpExecArray, index: number, vertical_index: number) {
    const regexArr = [sc, foc]
    const vertical_diagnal_only = vertical_sideway1(line, vertical_index, ele.index, regexArr) ? 1 : 0
    const vertical_diagnal_only1= vertical_sideway1(line, vertical_index, ele.index, regexArr.reverse()) ? 1 : 0
    const vertical_diagnal_only2 = vertical_sideway2(line, vertical_index, ele.index, regexArr) ? 1 : 0
    const vertical_diagnal_only3= vertical_sideway2(line, vertical_index, ele.index, regexArr.reverse()) ? 1 : 0

    return vertical_diagnal_only + vertical_diagnal_only1 + vertical_diagnal_only2 + vertical_diagnal_only3;
}

function vertical_check(line: string, ele: RegExpExecArray, index: number, vertical_index: number, regexOrder: boolean) {
    const regexArr = [sc, tc, foc]
    if (!regexOrder){
	regexArr.pop()
	regexArr.reverse().push(fc)
    }
    const vertical_ab = vertical_below(vertical_index, ele.index, regexArr) ? 1 : 0
    const vertical_side_ahead = vertical_sideway(line, vertical_index, ele.index, true, regexArr) ? 1 : 0
    const vertical_side_behind = vertical_sideway(line, vertical_index, ele.index, false, regexArr) ? 1 : 0

    return vertical_ab + vertical_side_ahead + vertical_side_behind;
}

function vertical_sideway(line: string, vertical_index: number, ele_index: number, ahead: boolean, regexArr: RegExp[]) {
    if (vertical_index >= matrix.length - 3) return false;
    if (ahead && ele_index >=line.length - 3) return false;
    if (!ahead && ele_index < 0 + 3) return false;

    if (!at_char_match(vertical_index + 1, ele_index + (ahead? 1 : -1 ), regexArr[0])) return false;
    if (!at_char_match(vertical_index + 2, ele_index + (ahead? 2 : -2 ), regexArr[1]))  return false;
    if (!at_char_match(vertical_index + 3, ele_index + (ahead? 3 : -3 ), regexArr[2])) return false;
    return true;
}

function vertical_sideway1(line: string, vertical_index: number, ele_index: number, regexArr: RegExp[]) {
    if (vertical_index >= matrix.length - 1) return false;
    if (vertical_index < 0 + 1) return false;
    if (ele_index >= line.length - 1) return false;
    if (ele_index < 0 + 1) return false;

    if (!at_char_match(vertical_index - 1, ele_index - 1, regexArr[0])) return false;
    if (!at_char_match(vertical_index - 1, ele_index + 1, regexArr[0])) return false;
    if (!at_char_match(vertical_index + 1, ele_index - 1, regexArr[1]))  return false;
    if (!at_char_match(vertical_index + 1, ele_index + 1, regexArr[1]))  return false;
    return true;
}

function vertical_sideway2(line: string, vertical_index: number, ele_index: number, regexArr: RegExp[]) {
    if (vertical_index >= matrix.length - 1) return false;
    if (vertical_index < 0 + 1) return false;
    if (ele_index >= line.length - 1) return false;
    if (ele_index < 0 + 1) return false;

    if (!at_char_match(vertical_index - 1, ele_index - 1, regexArr[0])) return false;
    if (!at_char_match(vertical_index + 1, ele_index - 1, regexArr[0]))  return false;
    if (!at_char_match(vertical_index - 1, ele_index + 1, regexArr[1])) return false;
    if (!at_char_match(vertical_index + 1, ele_index + 1, regexArr[1]))  return false;
    return true;
}


function vertical_below(vertical_index: number, ele_index: number, regexArr: RegExp[]) {
    if (vertical_index >= matrix.length - 3) return false;
    // Below
    if (!at_char_match(vertical_index + 1, ele_index, regexArr[0])) return false;
    if (!at_char_match(vertical_index + 2, ele_index, regexArr[1]))  return false;
    if (!at_char_match(vertical_index + 3, ele_index, regexArr[2])) return false;
    return true;
}

function at_char_match(line_num: number, ele_index: number, regex: RegExp) {
    const char = matrix[line_num].at(ele_index)

    if (char && char.match(regex)) return true
    return false
}

console.log('from day 03 Task01', counter);
console.log('from day 03 Task02', second_counter);
