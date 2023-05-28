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
    }
};

export default utils;