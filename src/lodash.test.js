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

describe("testing of lodash.dropRightWhile method", () => {

    test(
        `test should return an empty array because predicate returns true for each element in array (age property is greater
            than 18 in each object)`, 
        () => {
            const input = [
                {
                    name: "Richard",
                    age: 21
                },
                {
                    name: "Mary",
                    age: 25
                },
                {
                    name: "Patrik",
                    age: 32
                }
            ];
            const predicate = (obj) => obj.age > 18;
            const output = lodash.dropRightWhile(input, predicate);
            const expected = [];
            expect(output).toEqual(expected);
    });

    test(
        `test should return the first two elements of array when the length of array is 4 because 
            the last two elements will be excluded`,
        () => {
            const input = [
                { user: 'Logan', active: true },
                { user: 'Nancy', active: false },
                { user: 'Matthew', active: true },
                { user: 'George', active: true }
            ];
            const predicate = ["active", true];
            const output = lodash.dropRightWhile(input, predicate);
            const expected = input.slice(0, 2);
            expect(output).toEqual(expected);
    });

});

describe("testing of lodash.dropWhile method", () => {

    test(
        `test should return the same array as the input array because of 
            predicate will return true for each element in the array`, 
        () => {
            const input = [
                { count: 5 },
                { count: 10 },
                { count: 15 }
            ];
            const predicate = (obj) => obj.count % 5 !== 0;
            const output = lodash.dropWhile(input, predicate);
            const expected = [...input];
            expect(output).toEqual(expected);
    });

    test(`test should return an array only with the last element of the input array`, () => {
        const input = [
            { name: "Charley", active: true },
            { name: "Stacey", active: true },
            { name: "Marco", active: false }
        ];
        const predicate = "active";
        const output = lodash.dropWhile(input, predicate);
        const expected = [{...input[2]}];
        expect(output).toEqual(expected);
    });

});

describe("testing of lodash.fill method", () => {

    test(
        `Test should mutate the input array, the last element should be the sign of '$'.
            The start argument is equal to input.length - 1, the end argument is not passed`, () => {
        const input = [1,2,3,4,5];
        lodash.fill(input, "$", input.length - 1);
        const expected = [1,2,3,4,'$'];
        expect(input).toEqual(expected);
    });

    test(`Test should fill the input array with the sign of '*' from the first element to the last because of the start and
            end arguments are not passed`, () => {
        const input = [100,200,300,400,500,600];
        lodash.fill(input, "*");
        const expected = new Array(input.length);
        for ( let i = 0 ; i < expected.length ; i++ ) {
            expected[i] = '*';
        };
        expect(input).toEqual(expected);
    });

});



