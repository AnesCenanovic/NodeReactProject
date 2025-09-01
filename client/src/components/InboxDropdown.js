import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInbox } from '../actions'; // <-- Use the new action

const InboxDropdown = ({ inbox, auth, fetchInbox }) => {
    useEffect(() => {
        if (auth) {
            fetchInbox();
        }
    }, [auth, fetchInbox]);

    const { forums, posts, reviews } = inbox;

    return (
        <>
            <li>
                <a className="dropdown-trigger" href="#!" data-target="inbox-dropdown">
                    Inbox 
                    {/* Optional: Show a count of total items */}
                    <span className="new badge">{(forums.length + posts.length + reviews.length)}</span>
                </a>
            </li>

            <ul id="inbox-dropdown" className="dropdown-content">
                <li className="divider"></li>
                <li className="subheader">Your Forum Invitations</li>
                {forums.length > 0 ? (
                    forums.map(forum => (
                        <li key={`forum-${forum._id}`}>
                            <Link to={`/forums/${forum._id}`}>Forum: {forum.title}</Link>
                        </li>
                    ))
                ) : ( <li><a>No new forum activity</a></li> )}
                
                <li className="divider"></li>
                <li className="subheader">Your Posts</li>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li key={`post-${post._id}`}>
                            <Link to={`/posts/${post._id}`}>Post: {post.title}</Link>
                        </li>
                    ))
                ) : ( <li><a>You have not created any posts</a></li> )}

                <li className="divider"></li>
                <li className="subheader">Your Reviews</li>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <li key={`review-${review._id}`}>
                            <a>Review: {review.rating} stars</a>
                        </li>
                    ))
                ) : ( <li><a>You have not written any reviews</a></li> )}
            </ul>
        </>
    );
};

const mapStateToProps = ({ auth, inbox }) => ({ auth, inbox });
export default connect(mapStateToProps, { fetchInbox })(InboxDropdown);