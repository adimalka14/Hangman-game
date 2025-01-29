import Result from '../Result.js';

describe('Result', () => {
    test('constructor', () => {
        const result = new Result();
        expect(result.wins).toBe(0);
        expect(result.losses).toBe(0);
    });

    test('addScore', () => {
        const result = new Result();
        result.addWin();
        expect(result.wins).toBe(1);
        result.addWin();
        expect(result.wins).toBe(2);
    });

    test('addLoss', () => {
        const result = new Result();
        result.addLoss();
        expect(result.losses).toBe(1);
        result.addLoss();
        expect(result.losses).toBe(2);
    });
});
