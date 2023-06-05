const utils = {
    property(key) {
        return function(object) {
            return object[key];
        }
    },
    isEqualObjects(obj1, obj2) {
        if ( Object.keys(obj1).length !== Object.keys(obj2).length ) {
            return false;
        };
        for ( let key in obj1 ) {
            if ( !obj2.hasOwnProperty(key) || obj1[key] !== obj2[key] ) {
                return false;
            }
        };
        return true;
    },
    dropWhileByStartOrEnd(array, predicate, fn) {
        let slicedIdx;
		if ( typeof predicate === 'function' ) {
            slicedIdx = fn.call(array, item => !predicate(item));
		} else if ( typeof predicate === 'object' ) {
			if ( !Array.isArray(predicate) ) {
				slicedIdx = fn.call(array, item => !utils.isEqualObjects(item, predicate) );
			} else {
				slicedIdx = fn.call(array, item => item[predicate[0]] !== predicate[1] );
			}
		} else if ( typeof predicate === 'string' ) {
			slicedIdx = fn.call(array, item => !item[predicate] );
		}
        return slicedIdx;
    },
    findFirstOrLastIndex(array, predicate, fromStart, fromIndex) {
        if ( typeof predicate === 'object' ) {
			if ( !Array.isArray(predicate) ) {
                const target = predicate;
                predicate = (obj) => this.isEqualObjects(target, obj); 
            } 
			else if ( Array.isArray(predicate) ) {
                const key = predicate[0];
                const value = predicate[1];
				predicate = (obj) => obj[key] === value;
			}
		} else if ( typeof predicate === 'string' ) {
            const key = predicate;
			predicate = (obj) => obj[key] ? obj : false;
		}
        if ( fromStart ) {
            for ( ; fromIndex < array.length ; fromIndex++ ) {
                if ( predicate(array[fromIndex]) ) {
                    return fromIndex;
                }
            }
        } else {
            for ( ; fromIndex >= 0 ; fromIndex-- ) {
                if ( predicate(array[fromIndex]) ) {
                    return fromIndex;
                }
            }
        }
        return -1;
    }
};

export default utils;