import { FETCH_POSTS, CREATE_POST, UPDATE_POST } from '../actions/types';

const INITIAL_STATE = {
    data: [], 
    totalPages: 1,
    currentPage: 1
};

export default function postReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                data: action.payload.posts,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            };
        case CREATE_POST:
            return {
            ...state, 
                data: [action.payload, ...state.data] 
            };
        case UPDATE_POST:
            return {
                ...state,
                data: state.data.map(post => 
                    post._id === action.payload._id ? action.payload : post
                )
            };
        default:
            return state;
    }
}