const utils = {
    property(key) {
        return function(object) {
            return object[key];
        }
    },
};

export default utils;