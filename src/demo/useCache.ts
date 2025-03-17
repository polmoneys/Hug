import { useRef } from 'react';

type UnknownArray = Array<unknown>;
type UnknownObject = { [key: string]: UnknownArray };

interface Option {
    id: string;
    name: string;
}

type Options = Array<Option>;
function useCache() {
    const c = useRef({
        cache: {} as UnknownObject,
        has(key: string) {
            const ok = this.cache[key] !== undefined;
            return ok ? true : false;
        },
        set(key: string, value: UnknownArray | Options) {
            this.cache[key] = value;
        },
        clear() {
            this.cache = {};
        },
        get(key: string) {
            if (!this.has(key)) {
                return undefined;
            }
            return this.cache[key];
        },
    }).current;

    return c;
}

export default useCache;
