import React from 'react';
import { Link } from 'react-router-dom';
import { getIconForRole } from '../utils/iconHelper'; // Or a new getIconForForumType

// You can create a getIconForForumType in iconHelper.js if you haven't already
const getIconForForumType = (type) => {
    switch (type) {
        case 'workshop': return 'group';
        case 'event': return 'event';
        case 'seminar': return 'school';
        default: return 'forum';
    }
};

const ForumCard = ({ forum }) => (
    <div className="themed-card" key={forum._id}>
        <div className="card-content white-text">
            <span className="card-title">
                <i className="material-icons left">{getIconForForumType(forum.type)}</i>
                {forum.type.toUpperCase()}: {forum.title}
            </span>
            <p>{forum.description}</p>
        </div>
        <div className="card-action">
            <Link to={`/forums/${forum._id}`}>Enter Forum</Link>
        </div>
    </div>
);

export default ForumCard;