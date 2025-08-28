import React from 'react';

const UserSidebar = ({ user }) => (
    <li style={{ marginBottom: 10 }}>
        <strong>{user.name}</strong> ({user.role})<br />
        <small>{user.email}</small>
    </li>
);

export default UserSidebar;