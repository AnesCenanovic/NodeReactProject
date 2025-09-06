import React from 'react';
import { Link } from 'react-router-dom';


const getIconForForumType = (type) => {
    switch (type) {
        case 'workshop': return 'group';
        case 'event': return 'event';
        case 'seminar': return 'school';
        default: return 'forum';
    }
};

const ForumCard = ({ forum }) => {
    return (
        <div className="icon-card" key={forum._id}>
            <i className="material-icons icon-card-icon">
                {getIconForForumType(forum.type)}
            </i>
            <div className="icon-card-content">
                <h5 className="card-title">
                    {forum.type.toUpperCase()}: {forum.title}
                </h5>
                <p className="card-preview">
                    {forum.description && `${forum.description.substring(0, 150)}...`}
                </p>
                <div className="icon-card-action">
                    <Link to={`/forums/${forum._id}`}>Enter Forum</Link>
                </div>
            </div>
        </div>
    );
};

export default ForumCard;