import {React, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInbox } from '../actions';

const DashboardNav = ({ activeView, setActiveView, auth, inbox, fetchInbox }) => {
    useEffect(() => {
        if (auth) {
            fetchInbox();
        }
    }, [auth, fetchInbox]);

    const { forums, posts, reviews } = inbox;
    const totalInboxItems = forums.length + posts.length + reviews.length;

    return (
        <div>
            <h5>Navigation</h5>
            {/* We now use a <ul> with our new class instead of a <div> */}
            <ul className="themed-nav-menu">
                <li>
                    <a 
                        href="#!" 
                        onClick={() => setActiveView('posts')}
                        className={activeView === 'posts' ? 'active' : ''}
                    >
                        <i className="material-icons">article</i>
                        Posts
                    </a>
                </li>
                <li>
                    <a 
                        href="#!"
                        onClick={() => setActiveView('forums')}
                        className={activeView === 'forums' ? 'active' : ''}
                    >
                        <i className="material-icons">forum</i>
                        Forums
                    </a>
                </li>
            </ul>

            {/* The Inbox Section */}
            <div style={{ marginTop: '40px' }}>
                <h5>
                    Inbox
                    {/* A subtle count badge */}
                    {totalInboxItems > 0 && <span className="new badge" style={{ marginLeft: '10px' }}>{totalInboxItems}</span>}
                </h5>
                <ul className="themed-nav-menu">
                    {/* We can use the same styling for the inbox links */}
                    <li>
                        <Link to="/inbox">
                            <i className="material-icons">all_inbox</i>
                            View All Activity
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth, inbox }) => ({ auth, inbox });

export default connect(mapStateToProps, { fetchInbox })(DashboardNav);