import { FETCH_USER } from '../actions/types';

export default function authReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            console.log('FETCH_USER action received:', action.payload);
            return action.payload || false;
        default:
            return state;
    }
}