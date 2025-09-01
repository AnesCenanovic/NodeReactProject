import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'; // We need connect for the user's role
import axios from 'axios';
import { getIconForSpecialty } from '../utils/iconHelper';

// --- A new, separate component for the review form ---
const ReviewForm = ({ specialistId, onReviewSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/specialists/${specialistId}/reviews`, { rating, comment });
            onReviewSubmit(res.data); // Pass the new review back to the parent
            setRating(5); // Reset form
            setComment('');
        } catch (err) {
            console.error('Error submitting review', err);
        }
    };

    return (
        <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
            <h5>Leave a Review</h5>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating</label>
                    <p className="range-field">
                        <input type="range" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} />
                    </p>
                </div>
                <div className="input-field">
                    <textarea id="comment" className="materialize-textarea" value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    <label htmlFor="comment">Comment</label>
                </div>
                <button type="submit" className="btn green">Submit Review</button>
            </form>
        </div>
    );
};


const SpecialistDetailPage = ({ auth }) => { // We get auth from Redux
    const { id } = useParams(); 
    const [specialist, setSpecialist] = useState(null);
    const [reviews, setReviews] = useState([]); // State for reviews
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try { // It's good practice to wrap async calls in a try/catch
            setLoading(true);
            const res = await axios.get(`/api/specialists/${id}`);
            setSpecialist(res.data); 
            
            const reviewRes = await axios.get(`/api/specialists/${id}/reviews`);
            setReviews(reviewRes.data);

            setLoading(false);
        } catch (error) {
            console.error("Error in fetchData:", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [id]);

    const handleNewReview = (newReview) => {
        // Add the new review to the top of the list without a full page reload
        setReviews([newReview, ...reviews]);
    };
      console.log('Rendering component with specialist state:', specialist);
    if (loading) return <div>Loading...</div>;
    if (!specialist) return <div>Specialist not found.</div>;

    return (
        <div style={{ marginTop: '30px' }}>
            <div className="card blue-grey darken-1 white-text">
                <div className="card-content center-align">
                    <i className="material-icons" style={{ fontSize: '150px' }}>
                        {getIconForSpecialty(specialist.specialty)}
                    </i>
                    <h2>{specialist.name}</h2>
                    <h4>{specialist.specialty}</h4>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.1em', textAlign: 'left', marginTop: '30px' }}>
                        {specialist.fullBio}
                    </p>
                </div>
                <div className="card-action">
                    <h5>Details & Contact</h5>
                    {/* Display new fields */}
                    <p><strong>Website:</strong> <a href={specialist.website} target="_blank" rel="noopener noreferrer">{specialist.website}</a></p>
                    <p><strong>Address:</strong> {specialist.address}</p>
                    <p><strong>Email:</strong> {specialist.contactEmail || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {specialist.contactPhone || 'Not provided'}</p>
                </div>
            </div>

            {/* --- Review Section --- */}
            <div className="reviews-section">
                <h4>Reviews</h4>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div className="card" key={review._id}>
                            <div className="card-content">
                                <strong>Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</strong>
                                <p>{review.comment}</p>
                                <em className="right">by {review.authorName} on {new Date(review.createdAt).toLocaleDateString()}</em>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first!</p>
                )}
            </div>
            
            {/* Show the review form only to parents */}
            {auth && auth.role === 'parent' && (
                <ReviewForm specialistId={specialist._id} onReviewSubmit={handleNewReview} />
            )}
        </div>
    );
};

// We need to know the logged-in user's role to show/hide the review form
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(SpecialistDetailPage);