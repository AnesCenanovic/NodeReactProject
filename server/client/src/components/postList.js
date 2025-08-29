import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { fetchPosts } from '../actions';

const PostList = ({ posts, fetchPosts }) => {
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const renderPosts = () => {
        return posts.map(post => (
            <div className="card blue-grey darken-1" key={post._id}>
                <div className="card-content white-text">
                    <span className="card-title">{post.title}</span>
                    <p>{post.content.substring(0, 150)}...</p> 
                    <p className="right">Posted By: {post.authorName}</p>
                </div>
                <div className="card-action">
                    <Link to={`/posts/${post._id}`}>Read More</Link>
                </div>
            </div>
        ));
    };

    return <div>{renderPosts()}</div>;
};

const mapStateToProps = ({ posts }) => ({ posts });
export default connect(mapStateToProps, { fetchPosts })(PostList);