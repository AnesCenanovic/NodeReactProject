import React from 'react';
import { Link } from 'react-router-dom';
import { getIconForRole } from '../utils/iconHelper';

const UserCard = ({ user }) => {
    // This log helps us debug if the `role` is missing from the user object
    // You can remove it after you confirm the icons are working.
    console.log('UserCard received user:', user);

    // Defensive check in case user is not passed correctly
    if (!user) {
        return null;
    }

    return (
        // We're removing the blue-grey class to use the default card style, which is cleaner
        <div className="card" style={{ marginBottom: '15px' }}>
            <div className="card-content" style={{ padding: '15px' }}> {/* Reduced padding */}
                
                <i 
                    className="material-icons circle" 
                    style={{ 
                        fontSize: '24px', // Smaller icon
                        padding: '8px',   // Smaller padding
                        backgroundColor: '#eeeeee', // A light grey background for the circle
                        color: '#616161', // A darker grey for the icon
                        float: 'left', 
                        marginRight: '15px' 
                    }}
                >
                    {getIconForRole(user.role)}
                </i>

                <div style={{ fontSize: '0.9em', color: '#757575' }}>
                    <span className="card-title" style={{ fontSize: '1.1em', lineHeight: '1.2em' }}>
                        {user.name}
                    </span>
                    <p style={{ fontSize: '0.9em', color: '#757575' }}>
                        {user.email}
                    </p>
                    <p style={{ fontSize: '0.9em', color: '#757575', fontStyle: 'italic' }}>
                        {user.role}
                    </p>
                </div>

            </div>
            <div className="card-action" style={{ padding: '10px 15px' }}>
                <Link to={`/profile/${user._id}`}>View Profile</Link>
            </div>
        </div>
    );
};

export default UserCard;