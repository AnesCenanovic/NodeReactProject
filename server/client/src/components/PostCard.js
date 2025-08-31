import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIconForPost } from '../utils/iconHelper';
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
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">
                    {post._id && <i className="material-icons left">{getIconForPost(post._id)}</i>}
                    {post.title}
                </span>
                {post.content && <p>{post.content.substring(0, 150)}...</p>}
            </div>

            <div className="card-action card-action-flex">
                <Link to={`/posts/${post._id}`}>Read More</Link>

                <div className="right-align"> 
                    <p className="grey-text text-lighten-1" style={{ fontStyle: 'italic', margin: '0 15px 0 0', display: 'inline-block' }}>
                        By: {post.authorName}
                    </p>
                    <button 
                        onClick={handleLike} 
                        className={`btn-flat ${userHasLiked ? 'teal-text text-lighten-2' : 'white-text'}`}
                        disabled={!auth}
                        style={{ display: 'inline-flex', alignItems: 'center', padding: '0 10px' }} // Tighter style
                    >
                        <i className="material-icons" style={{ fontSize: '1.2rem' }}>thumb_up</i>
                        <span style={{ marginLeft: '8px' }}>{post.likes ? post.likes.length : 0}</span>
                </button>
            </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { likePost })(PostCard);