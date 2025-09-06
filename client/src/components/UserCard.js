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
            const conversation = res.data;
            history.push(`/chat/${conversation._id}`);
        } catch (err) {
            console.error('Error starting conversation', err);
        }
    };

    return (
        <div className="themed-card" style={{ display: 'flex', alignItems: 'center', padding: '16px', marginBottom: '15px' }}>
            
            <i className="material-icons circle" style={{ color: 'var(--accent-color)', backgroundColor: 'var(--primary-surface)' }}>
                {getIconForRole(user.role)}
            </i>
            <div style={{ marginLeft: '16px', flexGrow: 1 }}>
                <span style={{ fontWeight: 'bold', display: 'block' }}>
                    {user.name}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                    {user.role}
                </span>
            </div>
            
            <div className="card-actions">
                <Link to={`/profile/${user._id}`} className="btn-floating btn-small waves-effect waves-light" style={{ backgroundColor: 'var(--secondary-surface)', marginRight: '8px' }} title="View Profile">
                    <i className="material-icons">person</i>
                </Link>
                <button onClick={handleStartChat} className="btn-floating btn-small waves-effect waves-light blue" title="Message User">
                    <i className="material-icons">message</i>
                </button>
            </div>
        </div>
    );
};

export default UserCard;