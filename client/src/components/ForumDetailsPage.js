import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';
import { deleteForum } from '../actions';
import { connect } from 'react-redux';

const ForumDetailPage = ({auth, deleteForum}) => {
    const { id } = useParams();
    const history = useHistory();
    const [forum, setForum] = useState(null);

    const renderIcon = (type) => {
        switch (type) {
            case 'workshop':
                return 'group'; // Materialize icon name for a group
            case 'event':
                return 'event'; // Icon for an event
            case 'seminar':
                return 'school'; // Icon for learning/school
            default:
                return 'forum';
        }
    };

    const handleDelete = () => {
        deleteForum(id, history);
    };

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
                {sortedMembers.map(member => (
                    <UserCard key={member._id} user={member} />
                ))}
            </div>
        );
    };


    if (!forum) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <div className="card blue-grey darken-1 white-text" style={{ marginTop: '30px' }}>
                <div className="card-content">
                    <span className="card-title">
                        <i className="material-icons left">{renderIcon(forum.type)}</i>
                        {forum.title}
                    </span>

                    <p><strong>Type:</strong> {forum.type}</p>

                    {forum.eventDate && (
                        <p><strong>When:</strong> {new Date(forum.eventDate).toLocaleString()}</p>
                    )}

                    <p style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{forum.description}</p>
                </div>
                <div className="card-action">
                    {forum.links && forum.links.map((link, index) => {
                        const fullLink = link.startsWith('http') ? link : `https://$\{link}`;
                        return (
                            <a key={index} href={fullLink} target="_blank" rel="noopener noreferrer">
                                Link {index + 1}
                            </a>
                        );
                    })}
                    {auth && auth.role === 'admin' && (
                        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                            <Link to={`/forums/edit/${forum._id}`} className="btn yellow darken-2" style={{ marginRight: '10px' }}>
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="btn red">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {renderParticipants()}
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth }); 
export default connect(mapStateToProps, { deleteForum })(ForumDetailPage); 