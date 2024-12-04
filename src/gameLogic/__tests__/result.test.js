import Result from "../result.js";

describe("Result", () => {

    test("constructor", () => {
        const result = new Result();
        expect(result.score).toBe(0);
        expect(result.losses).toBe(0);
    });

    test("addScore", () => {
        const result = new Result();
        result.addScore();
        expect(result.score).toBe(1);
        result.addScore();
        expect(result.score).toBe(2);
    });

    test("addLoss", () => {
        const result = new Result();
        result.addLoss();
        expect(result.losses).toBe(1);
        result.addLoss();
        expect(result.losses).toBe(2);
    });

});