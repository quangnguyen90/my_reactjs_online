import { createStore } from 'redux';

var initialState = {
    status: false,
    sort: {
        by: 'name',
        value: 1 // 1: increase, -1: decrease
    }
}

var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        state.status = !state.status;
        return state;
    }
    if (action.type === 'SORT') {
        var { by, value } = action.sort; // by = action.sort.by
        var { status } = state; // status = state.status
        return {
            status: status,
            sort: {
                by: by,
                value: value
            }
        };
    }
    return state;
}

const store = createStore(myReducer);
console.log('Default: ', store.getState());

// Implement task: Toggle status
var toggleAction = { type: 'TOGGLE_STATUS'} ;
store.dispatch(toggleAction);
console.log('TOGGLE_STATUS: ', store.getState());

// Implement task: Sort name Z-A
var sortAction = {
    type: 'SORT',
    sort : {
        by: 'name',
        value: -1
    }
};
store.dispatch(sortAction);
console.log('SORT: ', store.getState());