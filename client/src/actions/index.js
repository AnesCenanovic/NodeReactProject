import axios from 'axios';
import { FETCH_USER, UPDATE_USER_ROLE, FETCH_USERS, FETCH_POSTS, FETCH_FORUMS, FETCH_SPECIALISTS, FETCH_INBOX, UPDATE_POST } from './types';

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

export const fetchForums = (page = 1) => async dispatch => {
    const res = await axios.get(`/api/forums?page=${page}&limit=5`);
    dispatch({ type: FETCH_FORUMS, payload: res.data });
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

export const editPost = (postId, values, history) => async dispatch => {
    await axios.patch(`/api/posts/${postId}`, values);
    history.push('/surveys'); 
};

export const deletePost = (postId, history) => async dispatch => {
    console.log('Attempting to delete post with ID:', postId);
    if (window.confirm('Are you sure you want to delete this post?')) {
        try {
            await axios.delete(`/api/posts/${postId}`);
            history.push('/surveys');
            dispatch(fetchPosts(1));
        } catch (error) {
            console.error('Error from server while deleting post:', error.response.data);
        }
    }
};

export const editForum = (forumId, values, history) => async dispatch => {
    await axios.patch(`/api/forums/${forumId}`, values);
    history.push('/surveys'); 
};

export const deleteForum = (forumId, history) => async dispatch => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
        await axios.delete(`/api/forums/${forumId}`);
        history.push('/surveys'); 
        dispatch(fetchForums(1)); 
    }
};

export const likePost = (postId) => async dispatch => {
    const res = await axios.patch(`/api/posts/${postId}/like`);
    dispatch({ type: UPDATE_POST, payload: res.data });
};

export const addComment = (postId, values) => async dispatch => {
    await axios.post(`/api/posts/${postId}/comments`, values);
};