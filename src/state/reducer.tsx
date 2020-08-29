interface Action {
    type: string,
    payload: any,
}

export default function reducer(state: Array<Column>, action: Action) {
    switch(action.type) {
        case "addColumn": {
            return state;
        };
        case "deleteColumn": {
            return state;
        };
        case "addCard": {
            return state;
        };
        case "deleteCard": {
            return state;
        };
        default: {
            return state;
        }
    }
}