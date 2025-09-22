import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getIconForPost } from '../utils/iconHelper';
import { deletePost, addComment } from '../actions';

const PostDetail = ({ auth, deletePost, addComment }) => {
    const { postId } = useParams();
    const history = useHistory();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We define a single async function to get all necessary data
        const fetchAllData = async () => {
            if (postId) {
                try {
                    setLoading(true);
                    
                    // Use Promise.all to run both API calls in parallel
                    const [postRes, commentsRes] = await Promise.all([
                        axios.get(`/api/posts/${postId}`),
                        axios.get(`/api/posts/${postId}/comments`)
                    ]);

                    // Once both are complete, update the state
                    setPost(postRes.data);
                    setComments(commentsRes.data);

                } catch (err) {
                    console.error("Error fetching post details", err);
                } finally {
                    // This will run whether the requests succeed or fail
                    setLoading(false);
                }
            }
        };

        fetchAllData();
    }, [postId]); // This effect correctly depends only on the postId from the URL


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await addComment(postId, { content: newComment });
        setNewComment('');
        // Re-fetch only the comments after submitting a new one
        const res = await axios.get(`/api/posts/${postId}/comments`);
        setComments(res.data);
    };

    const handleDelete = () => {
        deletePost(postId, history);
    };

    if (loading) {
        return <div className="center-align"><h5>Loading post...</h5></div>;
    }

    if (!post) {
        return <div className="center-align"><h5>Post not found.</h5></div>;
    }

    return (
        <div>
            <div className="card blue-grey darken-1 white-text" style={{ marginTop: '30px' }}>
                <div className="card-content">
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
                    {post.links && post.links.map((link, index) => {
                        const hasProtocol = link.startsWith('http://') || link.startsWith('https://');
                        const fullUrl = hasProtocol ? link : `https://${link}`;

                        return (
                            <a 
                                key={index} 
                                href={fullUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Link {index + 1}
                            </a>
                        );
                    })}
                    {auth && auth.role === 'admin' && (
                        <div className="right">
                            <Link 
                                to={`/posts/edit/${post._id}`} 
                                className="btn-floating yellow darken-2" 
                                style={{ marginRight: '10px' }}
                                title="Edit Post" 
                            >
                                <i className="material-icons">edit</i>
                            </Link>
                            <button 
                                onClick={handleDelete} 
                                className="btn-floating red"
                                title="Delete Post"
                            >
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="themed-form-container" style={{ marginTop: '30px' }}>
                <h5>Comments ({comments.length})</h5>
                <form onSubmit={handleCommentSubmit} style={{ marginBottom: '30px' }}>
                    <div className="input-field">
                        <textarea
                            id="comment-textarea"
                            className="materialize-textarea"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            style={{ color: 'white' }} 
                        ></textarea>
                    </div>
                    <button type="submit" className="btn green">Submit</button>
                </form>
            
                <div className="comment-list">
                    {comments.map(comment => (
                        <div className="comment" key={comment._id}>
                            <div className="comment-author">
                                <i className="material-icons">account_circle</i>
                                <strong>{comment.authorName}</strong>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { deletePost, addComment })(PostDetail);