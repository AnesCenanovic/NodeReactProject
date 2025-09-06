import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIconForPostType } from '../utils/iconHelper';
import { likePost } from '../actions';

const PostCard = ({ post, auth, likePost }) => {
    if (!post) {
        return null;
    }

    const userHasLiked = post.likes && post.likes.includes(auth?._id);

    const handleLike = () => {
        if (auth) {
            likePost(post._id);
        } else {
            alert('You must be logged in to like a post.');
        }
    };

    return (
        // The main container with our flexbox layout class
        <div className="icon-card" key={post._id}>
            
            {/* The Icon on the left */}
            <i className="material-icons icon-card-icon">
                {getIconForPostType(post.type)}
            </i>

            {/* The main content container on the right */}
            <div className="icon-card-content">
                
                {/* Post Type (e.g., "Article") */}
                <div className="card-subtitle">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</div>
                
                {/* Post Title */}
                <h5 className="card-title">{post.title}</h5>

                {/* Post Content Preview */}
                <p className="card-preview">
                    {post.content && `${post.content.substring(0, 150)}...`}
                </p>

                {/* The Action Bar at the bottom */}
                <div className="icon-card-action">
                    
                    {/* Left side of the action bar */}
                    <div>
                        <Link to={`/posts/${post._id}`}>Read More</Link>
                    </div>

                    {/* Right side of the action bar */}
                    <div className="right-align">
                        <span style={{ marginRight: '15px', fontStyle: 'italic', color: 'var(--accent-color)'}}>
                            By: {post.authorName}
                        </span>
                        
                        {/* Like Button */}
                        <button 
                            onClick={handleLike} 
                            className={`btn-flat ${userHasLiked ? 'teal-text text-lighten-2' : 'white-text'}`}
                            disabled={!auth}
                            style={{ display: 'inline-flex', alignItems: 'center', padding: '0 8px' }}
                        >
                            <i className="material-icons" style={{ fontSize: '1.2rem' }}>thumb_up</i>
                            <span style={{ marginLeft: '8px' }}>{post.likes ? post.likes.length : 0}</span>
                        </button>

                        {/* Comment Count */}
                        <span style={{ marginLeft: '10px', color: '#ccc', display: 'inline-flex', alignItems: 'center' }}>
                            <i className="material-icons" style={{ fontSize: '1.2rem', marginRight: '4px' }}>comment</i>
                            {post.commentCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { likePost })(PostCard);