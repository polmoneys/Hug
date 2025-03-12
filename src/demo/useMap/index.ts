import { useReducer } from 'react';
import mapReducer from './reducer';

const useMap = <T extends { id: string }>() => {
    const [state, dispatch] = useReducer(mapReducer, {
        selections: new Map<string, T>(),
    });

    const addObject = (id: string, object: T) =>
        dispatch({ type: 'ADD', id, object });

    const deleteObject = (id: string) => dispatch({ type: 'DELETE', id });

    const toggleObject = (id: string, object: T) =>
        dispatch({ type: 'TOGGLE', id, object });

    const addObjectsFromArray = (objectsArray: T[]) =>
        dispatch({ type: 'ADD_FROM_ARRAY', objectsArray });

    const resetState = () => dispatch({ type: 'RESET' });

    const getCount = () => state.selections.size;

    const hasSelection = (id: string) => state.selections.has(id);

    return {
        selections: state.selections,
        selectionsArray: Array.from(state.selections.values()),
        count: getCount(),
        hasCount: getCount() > 0,
        addObject,
        addObjectsFromArray,
        toggleObject,
        deleteObject,
        resetState,
        getCount,
        hasSelection,
    };
};

export default useMap;
