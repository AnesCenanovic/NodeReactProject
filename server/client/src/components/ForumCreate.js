import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useParams } from 'react-router-dom';
import { createForum, editForum, fetchUsers } from '../actions';
import axios from 'axios';

const ForumCreate = (props) => {
    const { forumId } = useParams();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('workshop'); 
    const [eventDate, setEventDate] = useState('');
    const [links, setLinks] = useState('');
    const [memberIds, setMemberIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.fetchUsers();

        if (forumId) {
            setLoading(true);
            axios.get(`/api/forums/${forumId}`).then(res => {
                const { title, description, type, links, members, eventDate } = res.data;
                
                setTitle(title);
                setDescription(description);
                setType(type);
                setLinks(links.join(', ')); 
                
                if (eventDate) {
                    setEventDate(new Date(eventDate).toISOString().substring(0, 16));
                }

                setMemberIds(members.map(member => member._id));
                setLoading(false);
            });
        } else {

            setLoading(false);
        }
    }, [forumId, props.fetchUsers]); 

    const handleCheckboxChange = (userId) => {
        setMemberIds(prevIds => 
            prevIds.includes(userId)
                ? prevIds.filter(id => id !== userId)
                : [...prevIds, userId]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = { title, description, type, eventDate, links, memberIds };
        
        if (forumId) {
            props.editForum(forumId, values, props.history);
        } else {
            props.createForum(values, props.history);
        }
    };

    const renderUserSelection = () => {
        if (!props.users || props.users.length === 0) return <p>Loading users...</p>;

        const groupedUsers = props.users.reduce((acc, user) => {
            (acc[user.role] = acc[user.role] || []).push(user);
            return acc;
        }, {});

        const roles = ['teacher', 'parent', 'medical professional', 'admin']; 

        return roles.map(role => (
            <div key={role}>
                <h5>{role.charAt(0).toUpperCase() + role.slice(1)}s</h5>
                {groupedUsers[role] && groupedUsers[role].map(user => (
                    <p key={user._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={memberIds.includes(user._id)}
                                onChange={() => handleCheckboxChange(user._id)}
                            />
                            <span>{user.name}</span>
                        </label>
                    </p>
                ))}
            </div>
        ));
    };

    if (loading) {
        return <div className="center-align"><h5>Loading form...</h5></div>;
    }

    return (
        <div className="themed-form-container">
            <h4>{forumId ? 'Edit Forum' : 'Create a New Forum'}</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="title" className="active">Forum Title</label>
                </div>

                <div className="input-field">
                    <textarea id="description" className="materialize-textarea" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="description" className="active">Description</label>
                </div>

                <div className="input-field">
                    <input id="eventDate" type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                    <label htmlFor="eventDate" className="active">Event Date & Time</label>
                </div>
                
                <div className="input-field">
                    <select className="browser-default" value={type} onChange={e => setType(e.target.value)} style={{ marginTop: '10px' }}>
                        <option value="workshop">Workshop</option>
                        <option value="event">Event</option>
                        <option value="seminar">Seminar</option>
                    </select>
                </div>

                <div className="input-field">
                    <input id="links" type="text" value={links} onChange={e => setLinks(e.target.value)} />
                    <label htmlFor="links" className="active">Relevant Links (comma-separated)</label>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <h5>Invite Members</h5>
                    {renderUserSelection()}
                </div>
                
                <div className="form-actions">
                    <Link to="/surveys" className="btn-flat red white-text">Cancel</Link>
                    <button type="submit" className="btn-flat teal right white-text">
                        {forumId ? 'Save Changes' : 'Create Forum'}
                        <i className="material-icons right">done</i>
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { createForum, editForum, fetchUsers })(withRouter(ForumCreate));