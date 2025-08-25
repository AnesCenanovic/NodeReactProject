import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';
import { updateUserRole } from '../actions/index';

const roles = ['parent', 'teacher', 'medical professional'];

const Profile = (props) => { // <-- Receive all props, including the new action
    const { auth, updateUserRole } = props; // <-- Destructure auth and the action

    const [role, setRole] = useState(auth ? auth.role : 'parent');
    const [message, setMessage] = useState('');

    const handleSelectChange = (e) => {
        setRole(e.target.value);
    };

    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        // Now, you call the Redux action instead of axios directly
        const result = await updateUserRole(role);

        if (result.success) {
            setMessage('Role updated successfully!');
        } else {
            setMessage(result.error?.response?.data?.error || 'Error updating role');
        }
    };

    if (!auth) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {auth.name}</p>
            <p><strong>Email:</strong> {auth.email}</p>
            {/* THIS WILL NOW UPDATE IN REAL TIME */}
            <p><strong>Role:</strong> {auth.role}</p> 
            <form onSubmit={handleRoleSubmit}>
                <label>
                    Change Role:
                    <select className="browser-default" value={role} onChange={handleSelectChange}>
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </label>
                <button type="submit" className="btn">Update Role</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });

// Connect the action creator to the component's props
export default connect(mapStateToProps, { updateUserRole })(Profile);