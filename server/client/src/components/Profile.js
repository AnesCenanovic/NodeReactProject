import React from 'react'; 
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIconForRole } from '../utils/iconHelper'; 

const Profile = ({ auth, users }) => {
    const { userId } = useParams();
    const userToShow = users.find(user => user._id === userId);
    const displayUser = userToShow || auth;

    if (!displayUser) {
        return <div>Loading profile...</div>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <i className="material-icons" style={{ fontSize: '150px', color: '#90a4ae' }}>
                {getIconForRole(displayUser.role)}
            </i>

            <h2>{displayUser.name}</h2>
            <p><strong>Email:</strong> {displayUser.email}</p>
            <p><strong>Role:</strong> {displayUser.role}</p>
        </div>
    );
};

const mapStateToProps = ({ auth, users }) => ({ auth, users });
export default connect(mapStateToProps)(Profile);