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
	findIndex(array, param) {
		if ( typeof param === 'function' ) {
			return array.indexOf(array.filter(param)[0])
		}
		else if ( typeof param === 'object' ) {
			if ( !Array.isArray(param) ) {
			return array.findIndex( el => el.user === param.user && el.active === param.active)
			} 
			else if ( Array.isArray(param) ) {
				if ( param.length === 2 ) {
					return array.findIndex( el => el[param[0]] === param[1])
				}
			}
		}
		else if ( typeof param === 'string' ) {
			for ( let obj of array ) {
				for ( let key in obj ) {
					if ( key === param || obj[key] === param ) {
						if ( typeof obj[key] === 'boolean' ) return array.findIndex(el => el[param] === true)
							else return array.indexOf(obj)
						}
					}
				}
			}
	},
	flatten(array) {
		return [].concat.apply([],array)
	},
	flattenDeep(array) {
		return array.flat(Infinity)
	},
	flattenDepth(array, depth = 1) {
		return array.flat(depth)
	},
	fromPairs(array) {
		let map = new Map();
		for ( let arr of array ) {
			map.set(arr[0],arr[1])
		}
		return Object.fromEntries(map)
	},
	head(array) {
		return array[0]
	},
	indexOf(array,value,fromIndex = 0) {
		return array.indexOf(value,fromIndex)
	},
	initial(array) {
		return array.slice(0,array.length-1)
	},
	intersection(...args) {
		let resultArray = [];
		for ( let x = 0 ; x < args[0].length; x++ ) {
			if ( args.every( el => el.includes(args[0][x]) ) ) {
				resultArray.push(args[0][x]);
			}
		}
		return resultArray;
	},
	join(...args) {
		let separator = args.pop();
		return args[0].join(separator);
	},
	last(array) {
		return array[array.length-1];
	},
	lastIndexOf(array, value, fromIndex = array.length-1) {
		return array.lastIndexOf(value, fromIndex);
	},
	nth(array, n = 0) {
		if ( n >= 0 ) {
			return array[n];
		}
		return array[array.length+n];
	},
	pull(array, ...args) {
		let hash = {};
		for ( let i = 0 ; i < args.length ; i++ ) {
			hash[args[i]] === 1 ? hash[args[i]] += 1 : hash[args[i]] = 1; 
		};
		let idx = 0;
		while ( idx < array.length ) {
			if ( hash[array[idx]] === 1 ) {
				array.splice(idx, 1);
				idx = 0;
			} else idx++;
		}
	},
	pullAll(array, args) {
		this.pull(array, ...args);
	},
	pullAllBy(array, values, iteratee) {
		let hashOfValues = {};
		let temp;
		for ( let i = 0 ; i < values.length ; i++ ) {
			temp = values[i][iteratee];
			if ( temp ) {
				hashOfValues[temp] = true;
			}	
		};
		let keys = Object.keys(hashOfValues).map( item => +item);
		for ( let i = 0 ; i < array.length ; i++ ) {
			if ( hashOfValues[array[i][iteratee]] && keys.includes(array[i][iteratee]) ) {
				array.splice(i--,1);
			}
		}
	},
	pullAt(array, indexes) {
		let removedItems = [];
		let removedItem;
		switch (typeof indexes) {
			case 'number': {
				removedItem = array.splice(indexes,1)[0];
				removedItems.push(removedItem);
				break;
			}
			case 'object': {
				let start = 0;
				while ( start < indexes.length ) {
					removedItem = array.splice(indexes[start],1)[0];
					removedItems.push(removedItem);
					indexes = indexes.map( item => item -= 1); 
					start++;
				}
				break;
			}
		}
		return removedItems; 
	},
	remove(array, predicate) {
		return array.filter((value, index, array) => {
			let truthyValue = predicate(value);
			if ( truthyValue ) {
				array.splice(index,1);
				return true;
			} else {
				return false;
			}
		});
	}
};
