
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createForum } from '../actions';

const ForumCreate = (props) => {
    // Use component state to manage each field of the form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('workshop'); // Default to 'workshop'
    const [links, setLinks] = useState('');
    const [invitedEmails, setInvitedEmails] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // The emails should be an array, so we split the string
        const emailsArray = invitedEmails.split(',').map(email => email.trim());

        // Call the action creator with all the form values
        props.createForum({ 
            title, 
            description, 
            type, 
            links, 
            invitedEmails: emailsArray 
        }, props.history);
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h4>Create a New Forum</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="title">Forum Title</label>
                </div>

                <div className="input-field">
                    <textarea id="description" className="materialize-textarea" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                
                {/* A dropdown select for the forum type */}
                <div className="input-field">
                    <select className="browser-default" value={type} onChange={e => setType(e.target.value)}>
                        <option value="workshop">Workshop</option>
                        <option value="event">Event</option>
                        <option value="seminar">Seminar</option>
                    </select>
                </div>

                <div className="input-field">
                    <input id="links" type="text" value={links} onChange={e => setLinks(e.target.value)} />
                    <label htmlFor="links">Relevant Links (comma-separated)</label>
                </div>

                <div className="input-field">
                    <textarea id="invitedEmails" className="materialize-textarea" value={invitedEmails} onChange={e => setInvitedEmails(e.target.value)}></textarea>
                    <label htmlFor="invitedEmails">Invite Users by Email (comma-separated)</label>
                </div>
                
                <Link to="/surveys" className="btn-flat red white-text">
                    Cancel
                </Link>

                <button type="submit" className="btn-flat teal right white-text">
                    Create Forum
                    <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    );
};

// Connect the component to the 'createForum' action and give it access to 'history'
export default connect(null, { createForum })(withRouter(ForumCreate));