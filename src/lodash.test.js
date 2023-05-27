import lodash from "./lodash";

describe("testing of lodash.chunk method", () => {

    test("test should return an array containing chunks with size = 2", () => {
        const input = [1,2,3,4,5,6,7,8,9,10];
        const size = 2;
        const output = lodash.chunk(input, size);
        const expected = [[1,2], [3,4], [5,6], [7,8], [9,10]];
        expect(output).toEqual(expected);
    });

    test("the last chunk must contains 1 element", () => {
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
    })
});

