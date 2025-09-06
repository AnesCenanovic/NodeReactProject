import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getIconForSpecialty } from '../utils/iconHelper';

const ReviewForm = ({ specialistId, onReviewSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return; // Prevent empty comments
        try {
            const res = await axios.post(`/api/specialists/${specialistId}/reviews`, { rating, comment });
            onReviewSubmit(res.data);
            setRating(5);
            setComment('');
        } catch (err) {
            console.error('Error submitting review', err);
        }
    };

    return (
        <div className="themed-form-container">
            <h5>Leave a Review</h5>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating: {rating} ★</label>
                    <p className="range-field">
                        <input type="range" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} />
                    </p>
                </div>
                <div className="input-field">
                    <textarea id="comment" className="materialize-textarea" value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    <label htmlFor="comment">Your experience...</label>
                </div>
                <button type="submit" className="btn green">Submit Review</button>
            </form>
        </div>
    );
};


const SpecialistDetailPage = ({ auth }) => {
    const { id } = useParams(); 
    const [specialist, setSpecialist] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/specialists/${id}`);
                console.log('Raw API response received in frontend:', res.data);
                setSpecialist(res.data.specialist);
                setReviews(res.data.reviews);
                setLoading(false);
            } catch (error) {
                console.error("Error in fetchData:", error);
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleNewReview = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    if (loading) return <div className="center-align"><h5>Loading...</h5></div>;
    if (!specialist) return <div className="center-align"><h5>Specialist not found.</h5></div>;

    return (
        <div className="row" style={{ marginTop: '20px' }}>
            <div className="col s12 m10 offset-m1">
                <div className="themed-card">
                    <div className="card-content" style={{ textAlign: 'center' }}>
                        <i className="material-icons" style={{ fontSize: '150px', color: 'var(--accent-color)' }}>
                            {getIconForSpecialty(specialist.specialty)}
                        </i>
                        <h2>{specialist.name}</h2>
                        <h4>{specialist.specialty}</h4>
                        
                        <div style={{ textAlign: 'left', marginTop: '30px' }}>
                            <h5>About</h5>
                            <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.1em' }}>
                                {specialist.fullBio}
                            </p>
                        </div>
                    </div>
                    <div className="card-action">
                        <h5>Details & Contact</h5>
                        <p><strong>Website:</strong> <a href={specialist.website} target="_blank" rel="noopener noreferrer">{specialist.website}</a></p>
                        <p><strong>Address:</strong> {specialist.address}</p>
                        <p><strong>Email:</strong> {specialist.contactEmail || 'Not provided'}</p>
                        <p><strong>Phone:</strong> {specialist.contactPhone || 'Not provided'}</p>
                    </div>
                </div>

                <div className="reviews-section" style={{ marginTop: '40px' }}>
                    <h4>Reviews</h4>
                    {console.log('Rendering reviews section with this `reviews` state:', reviews)}
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div className="review-card" key={review._id}>
                                <div className="rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                                <p>"{review.comment}"</p>
                                <div className="review-author">
                                    - {review.authorName}, {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="center-align">No reviews yet. Be the first!</p>
                    )}
                </div>
                
                {auth && auth.role === 'parent' && (
                    <ReviewForm specialistId={specialist._id} onReviewSubmit={handleNewReview} />
                )}

            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(SpecialistDetailPage);