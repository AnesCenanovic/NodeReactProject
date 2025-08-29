import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import postReducer from './postReducer';
import forumReducer from './forumReducer';


export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postReducer,
    forums: forumReducer
});