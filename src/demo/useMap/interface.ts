export type MapAction<T> =
    | { type: 'ADD'; id: string; object: T }
    | { type: 'DELETE'; id: string }
    | { type: 'TOGGLE'; id: string; object: T }
    | { type: 'ADD_FROM_ARRAY'; objectsArray: T[] }
    | { type: 'RESET' };

export type MapState<T> = {
    selections: Map<string, T>;
};
