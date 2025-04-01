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

export const splitArray = <T>(
    items: T[],
    fn: (el: T) => boolean
): [T[], T[]] => {
    const match = [] as T[];
    const dispose = [] as T[];
    for (const el of items) {
        if (fn(el)) {
            match.push(el);
        } else {
            dispose.push(el);
        }
    }
    return [match, dispose];
};

export type Fn<T = void> = () => T;
export type Nullable<T> = T | null | undefined;

export function batchInvoke(functions: Nullable<Fn>[]) {
    functions.forEach((fn) => fn?.());
}

export function extractPowerWords(
    query: string,
    powerWords: string[],
    bannedWords: string[]
): [string[], string[]] {
    const processedQuery = query
        .toLowerCase()
        .replace(/[^\w\s'’-]/gi, '')
        .replace(/\s{2,}/g, ' '); // remove any extra whitespace

    if (processedQuery === '') return [[], []];

    const words = [...new Set(processedQuery.split(' '))];
    const powerWordsSet = new Set(powerWords.map((word) => word.toLowerCase()));
    const bannedWordsSet = new Set(
        bannedWords.map((word) => word.toLowerCase())
    );

    const matches: string[] = [];
    const processedWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[,]/gi, ''); // remove punctuation marks

        const processedWord = word.toLowerCase();

        if (
            powerWordsSet.has(processedWord) &&
            !bannedWordsSet.has(processedWord)
        ) {
            matches.push(word);
        }
        if (
            !powerWordsSet.has(processedWord) &&
            !bannedWordsSet.has(processedWord)
        ) {
            processedWords.push(word);
        }
    }

    return [matches, processedWords];
}
