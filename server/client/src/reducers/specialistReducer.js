import { FETCH_SPECIALISTS, FETCH_SPECIALIST } from '../actions/types';

export default function specialistsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_SPECIALISTS:
            return action.payload;
        default:
            return state;
    }
}