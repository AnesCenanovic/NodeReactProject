import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createForum, fetchUsers } from '../actions'; 

const ForumCreate = (props) => {
    // This part is perfect. All the necessary state is here.
    useEffect(() => {
        props.fetchUsers();
    }, [props.fetchUsers]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('workshop');
    const [links, setLinks] = useState('');
    const [memberIds, setMemberIds] = useState([]); 

    const handleCheckboxChange = (userId) => {
        setMemberIds(prevIds => 
            prevIds.includes(userId)
                ? prevIds.filter(id => id !== userId)
                : [...prevIds, userId]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createForum({ title, description, type, links, memberIds }, props.history);
    };

    const renderUserSelection = () => {
        // This function is also perfect.
        if (!props.users || props.users.length === 0) return <p>Loading users...</p>;

        const groupedUsers = props.users.reduce((acc, user) => {
            (acc[user.role] = acc[user.role] || []).push(user);
            return acc;
        }, {});

        const roles = ['teacher', 'parent', 'medical professional']; 

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

    return (
        <div style={{ marginTop: '30px' }}>
            <h4>Create a New Forum</h4>
            <form onSubmit={handleSubmit}>
                
                {/* --- ADD THESE MISSING FIELDS BACK --- */}

                <div className="input-field">
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="title">Forum Title</label>
                </div>

                <div className="input-field">
                    <textarea id="description" className="materialize-textarea" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                
                <div className="input-field">
                    <select className="browser-default" value={type} onChange={e => setType(e.target.value)} style={{ marginTop: '10px' }}>
                        <option value="" disabled>Choose Forum Type</option>
                        <option value="workshop">Workshop</option>
                        <option value="event">Event</option>
                        <option value="seminar">Seminar</option>
                    </select>
                </div>

                <div className="input-field">
                    <input id="links" type="text" value={links} onChange={e => setLinks(e.target.value)} />
                    <label htmlFor="links">Relevant Links (comma-separated)</label>
                </div>
                
                {/* --- END OF MISSING FIELDS --- */}

                <div style={{ marginTop: '30px' }}>
                    <h5>Invite Members</h5>
                    {renderUserSelection()}
                </div>
                
                <Link to="/surveys" className="btn-flat red white-text">Cancel</Link>
                <button type="submit" className="btn-flat teal right white-text">Create Forum</button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { createForum, fetchUsers })(withRouter(ForumCreate));