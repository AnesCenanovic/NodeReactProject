import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import postReducer from './postReducer';


export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postReducer,
});