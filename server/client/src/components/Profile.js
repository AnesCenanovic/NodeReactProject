import React, { useState } from 'react'; 
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getIconForRole } from '../utils/iconHelper';
import { updateUserRoleAdmin, fetchUsers } from '../actions'; 

const AdminRoleForm = ({ user, updateUserRoleAdmin, fetchUsers }) => {
    const [role, setRole] = useState(user.role);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Updating...');
        const result = await updateUserRoleAdmin(user._id, role);
        if (result.success) {
            setMessage('Role updated successfully!');
            fetchUsers(); 
        } else {
            setMessage('Error updating role.');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '30px' }}>
            <h5>Admin Controls</h5>
            <form onSubmit={handleSubmit}>
                <label>Change Role:</label>
                <select className="browser-default" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="parent">parent</option>
                    <option value="teacher">teacher</option>
                    <option value="medical professional">medical professional</option>
                    <option value="admin">admin</option>
                </select>
                <button type="submit" className="btn green" style={{ marginTop: '10px' }}>Update Role</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};


const Profile = ({ auth, users, updateUserRoleAdmin, fetchUsers }) => { 
    const { userId } = useParams();
    const userToShow = users.find(user => user._id === userId);
    const displayUser = userToShow || auth;

    if (!displayUser) { return <div>Loading...</div>; }

    const canEdit = auth && (auth.role === 'admin' || auth._id === displayUser._id);

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <i className="material-icons" style={{ fontSize: '150px', color: '#90a4ae' }}>
                {getIconForRole(displayUser.role)}

                {canEdit && (
                    <div style={{ marginTop: '20px' }}>
                        <Link to={`/profile/edit/${displayUser._id}`} className="btn blue">
                            <i className="material-icons left">edit</i>
                            Edit Profile
                        </Link>
                    </div>
                )}
            </i>
            <h2>{displayUser.name}</h2>
            <p><strong>Email:</strong> {displayUser.email}</p>
            <p><strong>Role:</strong> {displayUser.role}</p>

            {auth && auth.role === 'admin' && (
                <AdminRoleForm user={displayUser} updateUserRoleAdmin={updateUserRoleAdmin} fetchUsers={fetchUsers} />
            )}
        </div>
    );
};

const mapStateToProps = ({ auth, users }) => ({ auth, users });

export default connect(mapStateToProps, { updateUserRoleAdmin, fetchUsers })(Profile);