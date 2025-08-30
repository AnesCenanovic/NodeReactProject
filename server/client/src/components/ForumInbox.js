
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchForums } from '../actions';

const ForumInbox = ({ auth, forums, fetchForums }) => {
    useEffect(() => {
        if (auth) {
            fetchForums();
        }
    }, [auth, fetchForums]);

    const renderForumList = () => {
        if (!forums || forums.length === 0) {
            return <li><a href="#!">No new invitations</a></li>;
        }
        return forums.map(forum => (
            <li key={forum._id}>
                <Link to={`/forums/${forum._id}`}>
                    {forum.title}
                </Link>
            </li>
        ));
    };

    return (
        <>
            <li>
                <a className="dropdown-trigger" href="#!" data-target="forum-dropdown">
                    Inbox <i className="material-icons right">arrow_drop_down</i>
                </a>
            </li>

            <ul id="forum-dropdown" className="dropdown-content">
                {renderForumList()}
            </ul>
        </>
    );
};

const mapStateToProps = ({ auth, forums }) => ({ auth, forums });
export default connect(mapStateToProps, { fetchForums })(ForumInbox);