import React from 'react';

const UserFilter = ({ searchTerm, onSearchChange, roleFilter, onRoleChange }) => {
    return (
        <div className="card" style={{ padding: '15px', marginBottom: '20px' }}>
            <div className="input-field" style={{ marginTop: 0 }}>
                <i className="material-icons prefix">search</i>
                <input 
                    id="search" 
                    type="text" 
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)} 
                />
            </div>
            <div className="input-field">
                <select 
                    className="browser-default"
                    value={roleFilter}
                    onChange={e => onRoleChange(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                    <option value="medical professional">Medical Professional</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>
    );
};

export default UserFilter;