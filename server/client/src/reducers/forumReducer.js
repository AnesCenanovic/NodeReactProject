import { FETCH_FORUMS } from '../actions/types';
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_FORUMS:
            return action.payload;
        default:
            return state;
    }
}