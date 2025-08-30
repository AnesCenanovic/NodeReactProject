import { FETCH_INBOX } from '../actions/types';

const INITIAL_STATE = { forums: [], posts: [], reviews: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_INBOX:
            return action.payload || INITIAL_STATE;
        default:
            return state;
    }
}