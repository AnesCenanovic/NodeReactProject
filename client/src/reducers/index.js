import { combineReducers } from "redux";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import postReducer from './postReducer';
import forumReducer from './forumReducer';
import specialistReducer from './specialistReducer';
import inboxReducer from './inboxReducer';


export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postReducer,
    forums: forumReducer,
    specialists: specialistReducer,
    inbox: inboxReducer
});