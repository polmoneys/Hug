/*
    getProperty(item, ['color', 'size']);   
*/

interface Entity {
    id: string;
}

export const getProperty = <K extends keyof Entity>(
    item: Entity,
    keys: K[]
): Entity[K][] => keys.map((key) => item[key]);

type Cb = (value: number) => number;

type ReturnChain = {
    value: number;
    then: (cb: Cb) => ReturnChain;
};

// const c = chain(5).then((n) => n * 3).value;

export function chain(value: number): ReturnChain {
    return {
        value: value,
        then: (callback: Cb) => {
            return chain(callback(value));
        },
    };
}

export const a_Z = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[~~(26 * Math.random())];
export const oneOrMinusOne = () => 1 - 2 * Math.round(Math.random());
export const yesNo = (val: string, def = false) =>
    /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;

// Object.freeze(counter)
let countState = 0;
export const counter = {
    increment() {
        return ++countState;
    },
    decrement() {
        return --countState;
    },
};
