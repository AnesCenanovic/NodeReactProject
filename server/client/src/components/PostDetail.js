import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getIconForPost } from '../utils/iconHelper';
import { deletePost } from '../actions';

const PostDetail = ({auth, deletePost}) => {
    const { postId } = useParams(); 
    const history = useHistory();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDelete = () => {
        deletePost(postId, history);
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/posts/${postId}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching post", err);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]); 

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div className="card blue-grey darken-1" style={{ marginTop: '30px' }}>
            <div className="card-content white-text">
                                <span className="card-title">
                    <i className="material-icons left">{getIconForPost(post._id)}</i>
                    {post.title}
                </span>
                <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
                <p className="right">
                    Posted By: {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="card-action">
                {post.links.map((link, index) => (
                    <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                        Link {index + 1}
                    </a>
                ))}
            </div>
            {auth && auth.role === 'admin' && (
                    <div style={{ marginTop: '10px' }}>
                        <Link to={`/posts/edit/${post._id}`} className="btn yellow darken-2" style={{ marginRight: '10px' }}>
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn red">
                            Delete
                        </button>
                    </div>
                )}
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth }); 
export default connect(mapStateToProps, { deletePost })(PostDetail); 