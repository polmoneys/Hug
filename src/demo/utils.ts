/*
interface Share {
  isin: string;
  name: string;
  // other properties...
}

const shares: Share[] = []
const uniqueShares = removeDuplicatesBy(shares, share => share.isin);

*/

export function removeDuplicatesBy<T, K>(
    input: T[],
    keySelector: (item: T) => K
): T[] {
    const seen = new Set<K>();
    return input.filter((item) => {
        const key = keySelector(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

/*
    getProperty(item, ['color', 'size']);   
*/

interface Product {
    id: string;
}

export const getProperty = <K extends keyof Product>(
    item: Product,
    keys: K[]
): Product[K][] => keys.map((key) => item[key]);
