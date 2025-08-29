// src/components/Sidebar.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions'; // <-- Import the action creator

const Sidebar = (props) => {
    // Destructure what we need from props
    const { auth, users, fetchUsers } = props;

    // This hook runs once when the component mounts
    useEffect(() => {
        // Only fetch users if we are logged in
        if (auth) {
            console.log('Sidebar.js: Calling fetchUsers()');
            fetchUsers();
        }
    }, [auth, fetchUsers]); // Dependency array ensures this runs when `auth` is available

    // Render logic
    const renderUserList = () => {
        if (!users || users.length === 0) {
            return <div>Loading users...</div>;
        }
        return users.map(user => {
            return (
                <li key={user._id}>
                    <a href={`/profile/${user._id}`}>{user.name}</a>
                </li>
            );
        });
    };

    if (!auth) {
        return <div>Please log in.</div>; // Or render nothing
    }

    return (
        <div>
            <h5>Other Users</h5>
            <ul>
                {renderUserList()}
            </ul>
        </div>
    );
};

// This function pulls state from the Redux store and maps it to the component's props
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        users: state.users // <-- This makes `state.users` available as `props.users`
    };
};

// This connects the component to Redux, providing `users` from the store
// and the `fetchUsers` action as props.
export default connect(mapStateToProps, { fetchUsers })(Sidebar);