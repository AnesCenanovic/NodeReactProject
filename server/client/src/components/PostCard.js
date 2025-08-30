import React from 'react';
import { Link } from 'react-router-dom';
import { getIconForPost } from '../utils/iconHelper';

const PostCard = ({ post }) => (
    <div className="themed-card" key={post._id}>
        <div className="card-content white-text">
            <span className="card-title">
                <i className="material-icons left">{getIconForPost(post._id)}</i>
                {post.title}
            </span>
            <p>{post.content.substring(0, 150)}...</p>
            <p className="right">Posted By: {post.authorName}</p>
        </div>
        <div className="card-action">
            <Link to={`/posts/${post._id}`}>Read More</Link>
        </div>
    </div>
);

export default PostCard;