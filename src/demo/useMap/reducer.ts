import { MapAction, MapState } from './interface';

const mapReducer = <T extends { id: string }>(
    state: MapState<T>,
    action: MapAction<T>,
): MapState<T> => {
    switch (action.type) {
        case 'ADD': {
            const nextMap = new Map(state.selections).set(
                action.id,
                action.object,
            );
            return { selections: nextMap };
        }
        case 'DELETE': {
            if (state.selections.has(action.id)) {
                const nextMap = new Map(state.selections);
                nextMap.delete(action.id);
                return { selections: nextMap };
            }
            return state;
        }
        case 'TOGGLE': {
            const isObjectExist = state.selections.has(action.id);
            const nextMap = new Map(state.selections);

            if (isObjectExist) {
                nextMap.delete(action.id);
            } else {
                nextMap.set(action.id, action.object);
            }
            return { selections: nextMap };
        }
        case 'ADD_FROM_ARRAY': {
            const nextMapFromArray = new Map(state.selections);

            const updatedMap = action.objectsArray.reduce((map, object) => {
                const id = object.id;
                map.set(id, object);
                return map;
            }, nextMapFromArray);

            return { selections: updatedMap };
        }
        case 'RESET':
            return { selections: new Map() };
        default:
            return state;
    }
};

export default mapReducer;
