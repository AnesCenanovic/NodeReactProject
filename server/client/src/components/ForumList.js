import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { fetchForums } from '../actions';

const ForumList = ({ forums, fetchForums }) => {
    useEffect(() => {
        fetchForums();
    }, [fetchForums]);

    // --- 1. HELPER FUNCTION FOR ICONS ---
    const renderIcon = (type) => {
        switch (type) {
            case 'workshop':
                return 'group'; // Materialize icon name for a group
            case 'event':
                return 'event'; // Icon for an event
            case 'seminar':
                return 'school'; // Icon for learning/school
            default:
                return 'forum';
        }
    };

    const renderForums = () => {
        if (!forums || forums.length === 0) {
            return (
                <div className="center-align">
                    <h5>No forums to display.</h5>
                </div>
            );
        }
        
        return forums.map(forum => (
            <div className="card blue-grey darken-1" key={forum._id}>
                <div className="card-content white-text">
                    <span className="card-title">
                        <i className="material-icons left">{renderIcon(forum.type)}</i>
                        {forum.type.toUpperCase()}: {forum.title}
                    </span>
                    <p>{forum.description}</p>
                </div>
                <div className="card-action">
                    <Link to={`/forums/${forum._id}`}>Details</Link>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <h4 className="center-align">Current Forums</h4>
            {renderForums()}
        </div>
    );
};

const mapStateToProps = ({ forums }) => {
    return { forums };
};

export default connect(mapStateToProps, { fetchForums })(ForumList);