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
        <div className="custom-card" key={post._id}>
            {/* --- ADD THIS IMAGE --- */}
            <div className="card-image">
                {/* 
                    This URL from Unsplash Source will give a random 1600x900 image
                    from the "technology" category. Each card will get a different image.
                */}
                <img src={`https://source.unsplash.com/1600x900/?technology,${post._id}`} alt={post.title} />
                <span className="card-title">{post.title}</span>
            </div>
            
            <div className="card-content">
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