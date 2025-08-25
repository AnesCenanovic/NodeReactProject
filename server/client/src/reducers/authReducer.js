import { FETCH_USER, UPDATE_USER_ROLE } from '../actions/types';

export default function authReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            console.log('FETCH_USER action received:', action.payload);
            return action.payload || false;
        case UPDATE_USER_ROLE:
            return action.payload; 
        default:
            return state;
    }
}