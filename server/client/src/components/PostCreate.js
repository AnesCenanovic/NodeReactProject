import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'; 
import { createPost } from '../actions'; 

const PostCreate = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [links, setLinks] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        props.createPost({ title, content, links }, props.history);
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h4>Create a New Post</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="title">Post Title</label>
                </div>

                <div className="input-field">
                    <textarea
                        id="content"
                        className="materialize-textarea" 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></textarea>
                    <label htmlFor="content">Content</label>
                </div>

                <div className="input-field">
                    <input
                        id="links"
                        type="text"
                        value={links}
                        onChange={e => setLinks(e.target.value)}
                    />
                    <label htmlFor="links">Links (comma-separated)</label>
                </div>
                
                <Link to="/dashboard" className="btn-flat red white-text">
                    Cancel
                </Link>

                <button type="submit" className="btn-flat teal right white-text">
                    Create Post
                    <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    );
};

export default connect(null, { createPost })(withRouter(PostCreate));