import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getIconForRole } from '../utils/iconHelper';
import axios from 'axios';

const UserCard = ({ user }) => {
    const history = useHistory();
    if (!user) { return null; }
    const handleStartChat = async () => {
        try {
            const res = await axios.post('/api/conversations', { otherUserId: user._id });
            history.push('/chat');
        } catch (err) {
            console.error('Error starting conversation', err);
        }
    };

    return (
        <div className="themed-card" style={{ marginBottom: '10px' }}>
            <Link to={`/profile/${user._id}`} className="card-content" style={{ padding: '12px', display: 'block', color: 'inherit' }}>
                <i 
                    className="material-icons circle" 
                    style={{ 
                        fontSize: '20px', 
                        padding: '8px',
                        backgroundColor: '#f5f5f5',
                        color: '#424242',
                        float: 'left', 
                        marginRight: '12px' 
                    }}
                >
                    {getIconForRole(user.role)}
                </i>
                <div style={{ overflow: 'hidden' }}>
                    <span className="card-title" style={{ fontSize: '1rem', lineHeight: '1.2rem', fontWeight: 500 }}>
                        {user.name}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: '#9e9e9e' }}>
                        {user.role}
                    </p>
                </div>
            </Link>
            <button onClick={handleStartChat} className="btn-small">Message</button>
        </div>
    );
};

export default UserCard;