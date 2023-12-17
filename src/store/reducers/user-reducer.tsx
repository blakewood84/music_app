import * as types from '../actions/action-types';

interface State {
	[key: string]: any;
	user: any;
	user_unsubscribe: any;
}

var initialState: State = {
    user: null,
    user_unsubscribe: null
};

interface ActionObject {
    type: string,
    data: any,
    unsubscribe: any
}

const usersReducer = (state = initialState, action:ActionObject ) => {

    switch (action.type) {
        case types.USER + '_PENDING': pending('user'); break;
        case types.USER + '_FULFILLED': fulfilled('user'); break;

        default:
    }

    return state;

    function pending(table: string) {
        state = {
            ...state,
            [table + '_pending']: true,
        };
    }

    function fulfilled(table: string) {
        state = {
            ...state,
            [table]: action.data,
            [table + '_pending']: false,
            [table + '_save_pending']: false,
            [table + '_unsubscribe']: (action.unsubscribe) ? action.unsubscribe : state[table + '_unsubscribe'],
        };
    }
};
export default usersReducer;


