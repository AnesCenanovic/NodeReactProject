import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import UserSidebar from './UserSidebar';

const Sidebar = ({ users, fetchUsers, auth }) => {
    useEffect(() => {
        if (auth) {
            console.log('Calling fetchUsers because auth is:', auth);
            fetchUsers();
        }
    }, [fetchUsers, auth]);
    console.log('Sidebar auth:', auth);
    console.log('Sidebar users:', users);
    if (!auth) return null; // Don't render sidebar if not logged in
    return (
        <div style={{ position: 'fixed', top: 64, right: 0, width: 250, height: 'calc(100vh - 64px)', overflowY: 'auto', background: '#fafafa', borderLeft: '1px solid #ccc', padding: 10, zIndex: 1000 }}>
            <h4>Users</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                    <UserSidebar key={user._id} user={user} />
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    users: state.users || [],
    auth: state.auth
});

export default connect(mapStateToProps, { fetchUsers })(Sidebar);