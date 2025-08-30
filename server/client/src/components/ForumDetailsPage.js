import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ForumDetailPage = () => {
    const { id } = useParams();
    const [forum, setForum] = useState(null);

    useEffect(() => {
        const fetchForum = async () => {
            const res = await axios.get(`/api/forums/${id}`);
            setForum(res.data);
        };
        fetchForum();
    }, [id]);

    const renderParticipants = () => {
        if (!forum || !forum.members) return null;

        const roleOrder = { 'teacher': 1, 'medical professional': 2, 'parent': 3 };

        const sortedMembers = [...forum.members].sort((a, b) => {
            return (roleOrder[a.role] || 99) - (roleOrder[b.role] || 99);
        });

        return (
            <div style={{ marginTop: '40px' }}>
                <h5>Participants ({sortedMembers.length})</h5>
                <ul className="collection">
                    {sortedMembers.map(member => (
                        <li className="collection-item avatar" key={member._id}>
                            <img src={member.profilePictureUrl} alt={member.name} className="circle" />
                            <span className="title">{member.name}</span>
                            <p>{member.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    if (!forum) {
        return <div></div>;
    }

    return (
        <div>
            <div className="card" style={{ marginTop: '30px' }}>
                <div className="card-content">
                    <span className="card-title">{forum.title}</span>
                    <p><strong>Type:</strong> {forum.type}</p>
                    <p style={{ marginTop: '20px' }}>{forum.description}</p>
                </div>
            </div>
            {renderParticipants()}
        </div>
    );
};

export default ForumDetailPage;