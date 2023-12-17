import usersReducer from '@/store/reducers/user-reducer';
import { combineReducers } from 'redux';

// Combine Reducers
var reducers = combineReducers({
    users: usersReducer,
});

export default reducers;