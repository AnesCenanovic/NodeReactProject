import axios from 'axios';
import { FETCH_USER, UPDATE_USER_ROLE, FETCH_USERS, FETCH_POSTS, CREATE_POST, FETCH_FORUMS, CREATE_FORUM, FETCH_SPECIALISTS, CREATE_SPECIALIST, FETCH_INBOX } from './types';

export const fetchUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');
        console.log('fetchUsers response:', res.data);
        dispatch({ type:FETCH_USERS, payload: res.data });
    } catch (error) {
        console.error('ERROR in fetchUsers:', error.response.data);
    }
};


export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
};
    
export const updateUserRole = (role) => async dispatch => {
    try {
        // The API call is now managed by the action
        const res = await axios.post('/api/user/role', { role });

        // Dispatch the action with the updated user from the server response
        dispatch({ type: UPDATE_USER_ROLE, payload: res.data });
        
        // You can return a success indicator if you want
        return { success: true };

    } catch (err) {
        // Handle errors if needed
        return { success: false, error: err };
    }
}

export const fetchPosts = (page = 1) => async dispatch => {
    const res = await axios.get(`/api/posts?page=${page}&limit=5`);
    dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const createPost = (values, history) => async dispatch => {
    const res = await axios.post('/api/posts', values);
    history.push('/surveys'); 
};

export const fetchForums = () => async dispatch => {
    try {
        const res = await axios.get('/api/forums');
        dispatch({ type: FETCH_FORUMS, payload: res.data });
    } catch (error) {
        console.error("Error fetching forums:", error);
    }
};

export const createForum = (values, history) => async dispatch => {
    try {
        await axios.post('/api/forums', values);
        history.push('/surveys'); 

    } catch (error) {
        console.error("Error creating forum:", error);
    }
};

export const fetchSpecialists = () => async dispatch => {
    try {
        const res = await axios.get('/api/specialists');
        dispatch({ type: FETCH_SPECIALISTS, payload: res.data });
    } catch (error) {
        console.error("Error fetching specialists:", error);
    }
};


export const createSpecialist = (values, history) => async dispatch => {
    try {
        await axios.post('/api/specialists', values);
        
        history.push('/specialists');
    } catch (error) {
        console.error("Error creating specialist:", error);
    }
};

export const updateUserRoleAdmin = (userId, role) => async dispatch => {
    try {

        const res = await axios.post(`/api/users/${userId}/role`, { role });
        return { success: true, data: res.data };
    } catch (err) {
        console.error("Error updating user role (admin):", err);
        return { success: false };
    }
};

export const fetchInbox = () => async dispatch => {
    const res = await axios.get('/api/inbox');
    dispatch({ type: FETCH_INBOX, payload: res.data });
};