import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const { postId } = useParams(); 
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <span className="card-title">{post.title}</span>
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
        </div>
    );
};

export default PostDetail;