import { FETCH_USERS } from '../actions/types';

export default function usersReducer(state = [], action) {
    // This log is our proof that the function is now being called.
    console.log('usersReducer was called with action:', action);

    switch (action.type) {
        case FETCH_USERS:
            return action.payload || []; 
        default:
            return state;
    }
}