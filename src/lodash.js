import utils from "./utils.js";

const lodash = {
	chunk(array,size) {
		let resultArray = [];
		let index = 0;
		while ( index < array.length ) {
			resultArray.push(array.slice(index, index + size));
			index += size; 
		}
		return resultArray;
	},
	compact(array) {
		const resultArray = [];
		for ( let value of array ) {
			if ( value ) {
				resultArray.push(value);
			}
		}
		return resultArray;
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
		const map = new Map();
		for ( let i = 1; i < arg.length ; i++ ) {
			for ( let value of arg[i] ) {
				map.set(value, true);
			};
		};
		const result = [];
		for ( let value of arg[0] ) {
			if ( !map.has(value) ) {
				result.push(value);
			};
		};
		return result;
	},
	differenceBy(...arg) {
		const map = new Map();
		let fn = arg.at(-1);
		if ( typeof fn !== 'function' ) {
			fn = utils.property(fn);
		};
		for ( let value of arg[1] ) {
			map.set(fn(value), true);
		};
		const result = [];
		for ( let value of arg[0] ) {
			if ( !map.has(fn(value)) ) {
				result.push(value);
			};
		};
		return result;
	},
	differenceWith(array, values, comparator) {
		const map = new Map();
		const result = [];
		for ( let value of values ) {
			for ( let i = 0 ; i < array.length ; i++ ) {
				const value1 = array[i];
				const comparingResult = comparator(value, value1);
				if ( comparingResult ) {
					map.set(i, true);
				};
			};
		};
		for ( let i = 0 ; i < array.length ; i++ ) {
			if ( !map.has(i) ) {
				result.push(array[i]);
			}
		};
		return result;
	},
	drop(array, num = 1) {
		return array.slice(num);
	},
	dropRight(array, num = 1) {
		if ( num === 0 ) return array;
		return array.slice(0,-num);
	},
	fill(array, value, start = 0, end = array.length) {
		while ( start < end ) {
			array[start++] = value;
		};
	},
	findIndex(array, param) {
		if ( typeof param === 'function' ) {
			return array.indexOf(array.filter(param)[0]);
		}
		else if ( typeof param === 'object' ) {
			if ( !Array.isArray(param) ) {
				return array.findIndex( el => utils.isEqualObjects(el, param) );
			} 
			else if ( Array.isArray(param) ) {
				if ( param.length === 2 ) {
					return array.findIndex( el => el[param[0]] === param[1]);
				}
			}
		}
		else if ( typeof param === 'string' ) {
			return array.findIndex( el => el[param] ? el : false);
		}
	},
	flatten(array) {
		return [].concat.apply([],array);
	},
	flattenDeep(array) {
		return array.flat(Infinity)
	},
	flattenDepth(array, depth = 1) {
		return array.flat(depth)
	},
	fromPairs(array) {
		let result = {};
		for ( let arr of array ) {
			result[arr[0]] = arr[1];
		};
		return result;
	},
	head(array) {
		return array[0]
	},
	indexOf(array,value,fromIndex = 0) {
		return array.indexOf(value,fromIndex)
	},
	initial(array) {
		return array.slice(0,array.length-1);
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

export default lodash;