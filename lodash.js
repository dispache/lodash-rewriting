let lodash = {
	chunk1(array,size) {
		let resultArray = [];
		let firstArray = [];
		let secondArray = [];
		for (let x=0;x<size;x++) {
			firstArray.push(array[x]);
		} 
		for ( let y=size;y<array.length;y++ ) {
			secondArray.push(array[y]);
		}
		resultArray.push(firstArray,secondArray);
		return resultArray;
	},
	chunk2(array,size) {
		let firstArray = array.filter((elem,index) => {
			return index<size;
		});
		let secondArray = array.filter((elem,index) => {
			return index==size || (index>size && index<array.length);
		})
		return [firstArray,secondArray];
	},
	compact(array) {
		return array.filter(el => {
			 return el != false 
		})
	},
	concat(...arg) {
		let resultArray = [];
		for ( let x in arg ) {
			if ( typeof arg[x] == 'object' ) {
				for ( let y of arg[x] ) {
					resultArray.push(y)
				}
			}
			else resultArray.push(arg[x])
		}	
		return resultArray;
	},
	difference(...arg) {
		let resultArray = arg[0];
		for ( let x=1;x<arg.length;x++ ) {
			for ( let y in arg[x] ) {
				let index = arg[0].indexOf(arg[x][y])
				if (arg[0].includes(arg[x][y])) {
					arg[0].splice(index,1);
				} 
			}
		}
		return resultArray;
	},
	differenceBy(...arg) {
		let resultArray = []
		if ( typeof arg[arg.length - 1] == 'function' ) {
			for ( let x=0;x<=arg.length-2;x++ ) {
				for ( let y of arg[x] ) {
					resultArray = arg[arg.length-1].call(null,y);
				}
			}
		} 
	return resultArray;
	},
	drop(array, num = 1) {
		return array.slice(num);
	},
	dropRight(array, num = 1) {
		if ( num === 0 ) return array;
		return array.slice(0,-num)
	},
	fill(array, value, start = 0, end = array.length) {
		let resultArray = [...array];
		for ( let i = start ; i < end ; i++ ) {
			resultArray[i] = value
		}
		return resultArray	
	},
	
}





