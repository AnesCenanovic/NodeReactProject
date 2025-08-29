import axios from 'axios';
import { FETCH_USER, UPDATE_USER_ROLE, FETCH_USERS } from './types';

export const fetchUsers = () => async dispatch => {
    const res = await axios.get('/api/users');
    
    // This sends the action object to all reducers
    dispatch({ type: FETCH_USERS, payload: res.data });
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