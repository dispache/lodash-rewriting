import utils from "./utils.js";

const lodash = {
	chunk(array,size) {
		if ( size <= 0 ) {
			return [];
		}
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
	dropRightWhile(array, predicate) {
		const slicedIdx = utils.dropWhileByStartOrEnd(array, predicate, Array.prototype.findLastIndex);
		return slicedIdx > -1
				? array.slice(0, slicedIdx + 1)
				: []
	},
	dropWhile(array, predicate) {
		const slicedIdx = utils.dropWhileByStartOrEnd(array, predicate, Array.prototype.findIndex);
		return slicedIdx > -1 ? array.slice(slicedIdx) : [];
	},
	fill(array, value, start = 0, end = array.length) {
		while ( start < end ) {
			array[start++] = value;
		};
	},
	findIndex(array, predicate, fromIndex = 0) {
		return utils.findFirstOrLastIndex(array, predicate, true, fromIndex);
	},
	findLastIndex(array, predicate, fromIndex = array.length - 1) {
		return utils.findFirstOrLastIndex(array, predicate, false, fromIndex);
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
	intersectionBy(...args) {
		let iteratee = args.at(-1);
		const result = [];
		const map = new Map();
		if ( typeof iteratee === "string" ) {
			iteratee = utils.property(iteratee);
			for ( let i = 1 ; i < args.length - 1 ; i++ ) {
				for ( let obj of args[i] ) {
					if ( obj.hasOwnProperty(args.at(-1)) ) {
						map.set(iteratee(obj), true);
					};
				};
			};
			for ( let value of args[0] ) {
				if ( value.hasOwnProperty(args.at(-1)) ) {
					if ( map.has(iteratee(value)) ) {
						result.push(value);
					}
				}
			}
		} else if ( typeof iteratee === "function" ) {
			for ( let i = 1 ; i < args.length - 1 ; i++ ) {
				for ( let value of args[i] ) {
					map.set(iteratee(value));
				};
			};
			for ( let value of args[0] ) {
				if ( map.has(iteratee(value)) ) {
					result.push(value);
				} 
			}
		}
		return result;
	},
	intersectionWith(array, values, comparator) {
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
			if ( map.has(i) ) {
				result.push(array[i]);
			}
		};
		return result;
	},
	join(array, separator = ",") {
		return array.join(separator);
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
		for ( let value of args ) {
			let idx = 0;
			while ( idx < array.length ) {
				if ( array[idx] === value ) {
					array.splice(idx, 1);
				} else {
					idx++;
				}
			}
		}
	},
	pullAll(array, args) {
		this.pull(array, ...args);
	},
	pullAllBy(array, values, iteratee) {
		for ( let value of values ) {
			if ( value.hasOwnProperty(iteratee) ) {
				let idx = 0;
				while ( idx < array.length ) {
					const curr = array[idx];
					if ( curr.hasOwnProperty(iteratee) && curr[iteratee] === value[iteratee] ) {
						array.splice(idx, 1);
					} else {
						idx++;
					}
				}
			}
		}
	},
	pullAllWith(array, values, comparator) {
		for ( let value of values ) {
			let idx = 0;
			while ( idx < array.length ) {
				const comparingResult = comparator(value, array[idx]);
				if ( comparingResult ) {
					array.splice(idx, 1);
				} else {
					idx++;
				}
			}
		}
	},
	pullAt(array, ...indexes) {
		const result = [];
		if ( typeof indexes[0] === 'object' ) {
			indexes = [...indexes[0]];
		}
		for ( let value of indexes ) {
			const removed = array[value];
			array[value] = null;
			result.push(removed);
		}
		let idx = 0;
		while ( idx < array.length ) {
			if ( array[idx] === null ) {
				array.splice(idx, 1);
			} else {
				idx++;
			}
		}
		return result;
	},
	remove(array, predicate) {
		const result = [];
		let idx = 0;
		while ( idx < array.length ) {
			const predicateResult = predicate(array[idx]);
			if ( predicateResult ) {
				result.push(array[idx]);
				array.splice(idx, 1);
			} else {
				idx++;
			}
		}
		return result;
	},
	reverse(array) {
		if ( array.length <= 1 ) return array;
		let left = 0;
		let right = array.length - 1;
		while ( left < right ) {
			let temp = array[right];
			array[right--] = array[left];
			array[left++] = temp;
		}
		return array;
	},
	slice(array, start = 0, end = array.length) {
		const result = new Array(end-start);
		let pointer = 0;
		while ( start < end ) {
			result[pointer++] = array[start++];
		}
		return result;
	},
	sortedIndex(array, value) {
		if ( value < array[0] || array.length === 0 ) {
			return 0;
		} else if ( value > array.at(-1) ) {
			return array.length;
		}
		let start = 0;
		let end = array.length-1;
		let middleIdx;
		while ( start <= end ) {
			middleIdx = Math.floor((start+end)/2);
			if ( value === array[middleIdx] ) {
				return middleIdx;
			} else if ( value < array[middleIdx] ) {
				if ( value > array[middleIdx-1] ) {
					return middleIdx;
				} else {
					end = middleIdx;
				}
			} else {
				if ( value < array[middleIdx+1] ) {
					return middleIdx+1;
				} else {
					start = middleIdx;
				}
			}
		}
	},
	sortedIndexBy(array, value, iteratee) {
		if ( typeof iteratee === 'string' ) {
			const key = iteratee;
			iteratee = utils.property(key);
		}
		if ( array.length === 0 || iteratee(value) < iteratee(array[0]) ) {
			return 0;
		} else if ( iteratee(value) > iteratee(array.at(-1)) ) {
			return array.length;
		}
		let start = 0;
		let end = array.length-1;
		let middleIdx, currValue, nextValue, prevValue, middleValue;
		while ( start <= end ) {
			middleIdx = Math.floor((start+end)/2);
			middleValue = iteratee(array[middleIdx]);
			currValue = iteratee(value);
			nextValue = iteratee(array[middleIdx+1] || []);
			prevValue = iteratee(array[middleIdx-1] || []);
			if ( currValue === middleValue ) {
				return middleIdx;
			} else if ( currValue < middleValue ) {
				if ( currValue > prevValue ) {
					return middleIdx;
				} else {
					end = middleIdx;
				}
			} else {
				if ( currValue < nextValue ) {
					return middleIdx+1;
				} else {
					start = middleIdx;
				}
			}
		}
	},
	sortedIndexOf(array, value) {
		if ( array.length === 0 ) {
			return -1;
		}
		let middleIdx;
		let start = 0;
		let end = array.length-1;
		while ( start <= end ) {
			middleIdx = Math.floor((start+end)/2);
			if ( value === array[middleIdx] ) {
				if ( value === array[middleIdx-1] ) {
					end = middleIdx-1;
				} else {
					return middleIdx;
				}
			} else if ( value < array[middleIdx] ) {
				end = middleIdx-1;
			} else if ( value > array[middleIdx] ) {
				start = middleIdx+1;
			}
		}
		return -1;	
	},
	sortedUniq(array) {
		const sorted = array.sort();
		return [...new Set(sorted)];
	},
	sortedUniqBy(array, iteratee) {
		const set = new Set();
		const comparable = new Set();
		for ( let i = 0 ; i < array.length ; i++ ) {
			const value = iteratee(array[i]);
			if ( !comparable.has(value) ) {
				set.add(array[i]);
				comparable.add(value);
			}
		}
		return [...set];
	},
	tail(array) {
		return array.slice(1);
	},
	take(array, n=1) {
		if ( n < 0 ) {
			return [];
		}
		return array.slice(0, n);
	},
	takeRight(array, n=1) {
		if ( n < 0 ) {
			return [];
		}
		const from = array.length-n;
		return array.slice(from < 0 ? 0 : array.length-n);
	},
	union(...arrays) {
		const set = new Set();
		for ( let array of arrays ) {
			for (let value of array) {
				set.add(value);
			}
		}
		return [...set];
	},
	uniq(array) {
		const set = new Set();
		for (let value of array) {
			set.add(value);
		}
		return [...set];
	},
	unzip(array) {
		const result = [];
		const resultLength = array[0].length;
		for (let i = 0; i < resultLength; i++) {
			const current = [];
			for (let value of array) {
				current.push(value[i]);
			}
			result.push(current);
		}
		return result;
	},
	unzipWith(array,iteratee) {
		const result = [];
		const resultLength = array[0].length;
		for (let i = 0; i < resultLength; i++) {
			const current = [];
			for (let value of array) {
				current.push(value[i]);
			}
			const resultValue = iteratee(...current);
			result.push(resultValue);
		}
		return result;
	}
};

export default lodash;
