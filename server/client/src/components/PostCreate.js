import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useParams } from 'react-router-dom'; 
import { createPost, editPost } from '../actions';
import axios from 'axios';

const PostCreate = (props) => {

    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [links, setLinks] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = { title, content, links };
        
        if (postId) {
            props.editPost(postId, values, props.history);
        } else {
            props.createPost(values, props.history);
        }
    };

    useEffect(() => {
        if (postId) {
            axios.get(`/api/posts/${postId}`).then(res => {
                const { title, content, links } = res.data;
                setTitle(title);
                setContent(content);
                setLinks(links.join(', ')); 
            });
        }
    }, [postId]);

    return (
        <div style={{ marginTop: '30px' }}>
            <h4>{postId ? 'Edit Post' : 'Create a New Post'}</h4>
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

export default connect(null, { createPost, editPost })(withRouter(PostCreate));