import lodash from "./lodash";

describe("testing of lodash.chunk method", () => {

    test("test should return an array containing chunks with size = 2", () => {
        const input = [1,2,3,4,5,6,7,8,9,10];
        const size = 2;
        const output = lodash.chunk(input, size);
        const expected = [[1,2], [3,4], [5,6], [7,8], [9,10]];
        expect(output).toEqual(expected);
    });

    test("the last chunk must contain 1 element", () => {
        const input = [1,2,3,4,5,6];
        const size = 5;
        const output = lodash.chunk(input, size);
        const expected = 1;
        expect(output.at(-1).length).toBe(expected);
    });

    test("test should return an empty array if size is equal to 0", () => {
        const input = [1,2,3,4,5,6];
        const size = 0;
        const output = lodash.chunk(input, size);
        const expected = [];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.compact method", () => {

    test("test should return an array with all falsey values removed", () => {
        const input = [1,null,2,false,3,"",4,undefined,5,NaN,6,0,7];
        const output = lodash.compact(input);
        const expected = [1,2,3,4,5,6,7];
        expect(output).toEqual(expected);
    });

    test("test should return an empty array", () => {
        const input = [false, NaN, undefined];
        const output = lodash.compact(input);
        const expected = [];
        expect(output).toEqual(expected);
    });

    test("test should not remove values", () => {
        const input = [1,2,3,4,5];
        const output = lodash.compact(input);
        const expected = [...input];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.concat method", () => {

    test("test should return an array containing two empty arrays", () => {
        const input = [[], []];
        const output = lodash.concat(input);
        const expected = [[], []];
        expect(output).toEqual(expected);
    });

    test("test should concat three arrays into one", () => {
        const input1 = [1,2];
        const input2 = [3,4];
        const input3 = [[5]];
        const output = lodash.concat(input1, input2, input3);
        const expected = [1,2,3,4,[5]];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.difference method", () => {

    test("test should return an array that does not contain the value 2 and 5", () => {
        const input = [1,2,3,4,5,6];
        const exclude2 = [2];
        const exclude5 = [5];
        const output = lodash.difference(input, exclude2, exclude5);
        const expected = [1,3,4,6];
        expect(output).toEqual(expected);
    });

    test("test should not remove values", () => {
        const input = [1,2,3,4,5];
        const exclude9 = [9];
        const output = lodash.difference(input, exclude9);
        const expected = [...input];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.differenceBy method", () => {

    test(`
            test should to apply function Math.floor (the last argument passed into method) 
            to every element in the first and second arrays and return an array that does not contain elements from second array`, 
            () => {
                const input = [1.2, 4.4, 3.3];
                const exclude = [4.2, 3.1];
                const fn = Math.floor;
                const output = lodash.differenceBy(input, exclude, fn);
                const expected = [1.2];
                expect(output).toEqual(expected);
    });

    /**
     *  TODO
     */

});

describe("testing of lodash.drop method", () => {

    test("test should return an array that contains values from the input array", () => {
        const input = [1,2,3,4,5];
        const num = 0;
        const output = lodash.drop(input, num);
        const expected = [...input];
        expect(output).toEqual(expected);
    });

    test("test should return an empty array", () => {
        const input = [1,2,3,4,5];
        const num = 10;
        const output = lodash.drop(input, num);
        const expected = [];
        expect(output).toEqual(expected);
    });

    test("test should remove the first value from the input array", () => {
        const input = [1,2,3,4,5];
        const num = 1;
        const output = lodash.drop(input, num);
        const expected = [2,3,4,5];
        expect(output).toEqual(expected);
    });

    test("test should return the input array without the first element because num parameter was not passed", () => {
        const input = [1,2,3,4,5];
        const output = lodash.drop(input);
        const expected = [2,3,4,5];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.dropRight method", () => {

    test("test should return the input array without the last element because of num parameter was not passed", () => {
        const input = [1,2,3,4,5];
        const output = lodash.dropRight(input);
        const expected = [1,2,3,4];
        expect(output).toEqual(expected);
    });

    test("test should return the input array because of num parameter is equal to 0", () => {
        const input = [1,2,3,4,5];
        const num = 0;
        const output = lodash.dropRight(input, num);
        const expected = [...input];
        expect(output).toEqual(expected);
    });

});


