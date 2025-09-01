import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchInbox } from '../actions'; 

import PostCard from './PostCard'; 
import ForumCard from './ForumCard'; 

const ReviewCard = ({ review }) => (
    <div className="card grey darken-3">
        <div className="card-content white-text">
            <span className="card-title">Your Review</span>
            <strong>Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</strong>
            <p style={{ fontStyle: 'italic', marginTop: '10px' }}>"{review.comment}"</p>
        </div>
    </div>
);


const InboxPage = ({ auth, inbox, fetchInbox }) => {
    // When the component mounts, fetch all the data for the inbox
    useEffect(() => {
        if (auth) {
            fetchInbox();
        }
    }, [auth, fetchInbox]);

    const { forums, posts, reviews } = inbox;

    return (
        <div>
            <h2 className="center-align">My Activity</h2>
            
            <div className="row">
                {/* We can use a grid layout to organize the sections */}
                <div className="col s12 m6">
                    <h4>Your Forum Memberships</h4>
                    {forums.length > 0 ? (
                        forums.map(forum => <ForumCard key={forum._id} forum={forum} />)
                    ) : ( <p>You have not joined any forums.</p> )}
                </div>

                <div className="col s12 m6">
                    <h4>Your Posts</h4>
                    {posts.length > 0 ? (
                        posts.map(post => <PostCard key={post._id} post={post} />)
                    ) : ( <p>You have not created any posts.</p> )}
                </div>
            </div>

            <hr style={{ margin: '40px 0' }} />

            <div className="row">
                <div className="col s12">
                    <h4>Your Reviews</h4>
                    {reviews.length > 0 ? (
                        reviews.map(review => <ReviewCard key={review._id} review={review} />)
                    ) : ( <p>You have not written any reviews.</p> )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth, inbox }) => ({ auth, inbox });

export default connect(mapStateToProps, { fetchInbox })(InboxPage);