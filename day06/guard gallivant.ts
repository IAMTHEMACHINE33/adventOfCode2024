import fs from "fs";

const puzzle = fs.readFileSync("./day06/puzzle.txt", 'utf-8').split('\n');
let global_lab_map = puzzle.map(ele => ele.split('')).filter(ele => ele.length)

type TDirection = '^'| '>'| '<'| 'V';
interface ILocation {
    cposition: [y: number, x: number];
    direction: TDirection;
}
interface ILocationDetails extends ILocation {
    positive: boolean;
    leading: number;
    length: number;
}

console.log('from day 06 Task01', getDifferentPostionOfGuard())
loopAddObstruction().then((data) => console.log('from day 06 Task02', data))
//onceObs(11).then((data) => data)
async function loopAddObstruction () {
    // Run Loop
    const allPromise = global_lab_map.map(async(ele,y) => {
	return await onceObs(y)
    })
    const data = await Promise.all(allPromise)
    return data.reduce((acc, ele) => acc+ele,0)
}

async function onceObs(y: number) {
    const sadf = global_lab_map[y].map(async (ele1, x ) => {
	// counter context
	//let counter = 0
	const option = {
	    counter : 0,
	}
	// lab_map context
	const lab_map = puzzle.map(ele => ele.split('')).filter(ele => ele.length)
	// Add O 
	if (lab_map[y][x] === '#') return false
	    lab_map[y][x] = 'O'   
	console.log('y, x',y, x)
	while (true) {
	    const guard_position = getGuard(lab_map, [y, x], option)

	    if (typeof guard_position === 'number') {
		lab_map[y][x] = '.'   
		console.log('here')
		return false;
	    }
	    if (typeof guard_position === 'boolean' && !guard_position) {
		lab_map[y][x] = '.'  

		console.log('shouldnt', y, x)
		//return [y, x];
		return true;
	    }

	    if (isLocation(guard_position)) {
	    const guard_position_info = preMovingInfo(guard_position, lab_map)
	    goUntilObstacle(guard_position_info, lab_map, option)
	    //console.log('laba', lab_map.map(ele => ele.join()))
	    }
	    //return false
	}
    })
    const lineOfPromise = await Promise.all(sadf)
    return lineOfPromise.filter((ele1) => ele1).length;
}

function getDifferentPostionOfGuard() {
    const lab_map = puzzle.map(ele => ele.split('')).filter(ele => ele.length)
    while (true) {
    //for(let i = 0; i < 11; i ++) {
    const guard_position = getGuard(lab_map)
    if (typeof guard_position === 'number') return guard_position;
    if (isLocation(guard_position)) {
	const guard_position_info = preMovingInfo(guard_position, lab_map)
	goUntilObstacle(guard_position_info, lab_map)}
    }
    //}
}

function goUntilObstacle (info: ILocationDetails, lab_map: string[][], option?: {counter: number; [key: string]: number}) {
    const leadIndex = info.leading
    const leading = info.cposition[info.leading]
    const trailing = info.cposition[info.leading? 0 : 1]
    const direction = info.direction
    const positive = info.positive
    const length = info.length

    for (let i = leading; (!positive? i >= 0: i < length); (!positive? i--: i++)) {


	if (['O'].includes((leadIndex ? lab_map[trailing][i]: lab_map[i][trailing])))
	    { 	
		if (option && option.counter >= 0)
		    option.counter++;
	    }
	if (['#', 'O'].includes((leadIndex ? lab_map[trailing][i]: lab_map[i][trailing]))) {
	    if (leadIndex) {
		lab_map[trailing][i +(!positive ? 1 : -1)] = direction
		if (option){
		    option[`${trailing}${i}`] = (option[`${trailing}${i}`] ?? 0) + 1;
		    //console.log('option[`${trailing}${i}`] ', `${trailing}${i}` )
		    }
	    }
	    else {
		lab_map[i +(!positive ? 1 : -1)][trailing] = direction
		if (option)
		    option[`${i}${trailing}`] = (option[`${i}${trailing}`] ?? 0) + 1;
	    }
	    return lab_map;
	}

	if (leadIndex) 
	    lab_map[trailing][i]= 'X';

	else 
	    lab_map[i][trailing] = 'X';
	
    }
    return lab_map
}

function preMovingInfo (info: ILocation, lab_map: string[][]): ILocationDetails{
    const [y, x] = info.cposition
    switch (info.direction) {
	case '^':
	    return {cposition:info.cposition, direction:'>', leading: 0, positive: false, length: lab_map.length};
	    break;
	case 'V':
	    return {cposition:info.cposition, direction:'<', leading: 0, positive: true, length: lab_map.length};
	    break;
	case '>':
	    return {cposition:info.cposition, direction:'V', leading: 1, positive: true, length: lab_map[y].length};
	    break;
	case '<':
	    return {cposition:info.cposition, direction:'^', leading: 1, positive: false, length: lab_map[y].length};
	    break;
    }
}

function countLabMapPosition(lab_map: string[][]) {
    return lab_map.reduce((acc, ele) => {
	return acc += ele.filter(ele1 => ele1 === 'X').length
    }, 0)
}

function isLocation(location: ILocation | number | unknown): location is ILocation{
  return (location as ILocation).direction !== undefined;
}

function getGuard(lab_map: string[][], checkerArr?: [y:number, x:number], option?: Record<string, number>):ILocation | number | boolean{
    const y = lab_map.findIndex((ele) => ele.includes('^') || ele.includes('>') || ele.includes('<') || ele.includes('V'))

    if (y < 0 || y > lab_map.length - 1) {
	return countLabMapPosition(lab_map)
    }
    const x = lab_map[y].findIndex(ele => ['^', '>', '<', 'V'].includes(ele))

    if (checkerArr && option) {
	const counter = option.counter
	const changedDirectionInSamePlace = Object.values(option).every((ele) => ele < 15)
	if (counter > 3 || !changedDirectionInSamePlace){ 
	    return false;
	}
    }
    return {cposition: [y, x], direction: lab_map[y][x] as TDirection}
}
