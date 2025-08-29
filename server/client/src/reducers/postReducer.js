import { FETCH_POSTS, CREATE_POST } from '../actions/types';

export default function postReducer(state = [], action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload;
        case CREATE_POST:
            return [action.payload, ...state];
        default:
            return state;
    }
}