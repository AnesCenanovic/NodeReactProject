import { FETCH_FORUMS } from '../actions/types';

const INITIAL_STATE = {
    data: [], 
    totalPages: 1,
    currentPage: 1
};

export default function forumsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_FORUMS:
            return {
                data: action.payload.forums,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };
        default:
            return state;
    }
}