import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchForums } from '../actions'; // We need the fetchForums action

const ForumList = ({ forums, fetchForums }) => {
    // When the component mounts, call the action to fetch the forums
    useEffect(() => {
        fetchForums();
    }, [fetchForums]);

    // A helper function to render the list of forums
    const renderForums = () => {
        // Show a loading message if the forums haven't arrived yet
        if (!forums || forums.length === 0) {
            return (
                <div className="center-align">
                    <h5>No forums to display.</h5>
                    <p>Create a new forum to get started!</p>
                </div>
            );
        }
        
        // Map over the forums and render a card for each one
        return forums.map(forum => (
            <div className="card blue-grey darken-1" key={forum._id}>
                <div className="card-content white-text">
                    <span className="card-title">{forum.title}</span>
                    <p><strong>Type:</strong> {forum.type}</p>
                    <p>{forum.description}</p>
                </div>
                <div className="card-action">
                    {/* In the future, this could link to a detailed forum page */}
                    <a href="#">Enter Forum</a>
                    {forum.links && forum.links.map((link, index) => (
                         <a key={index} href={link} target="_blank" rel="noopener noreferrer">Link {index + 1}</a>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div>
            <h4 className="center-align">Your Collaborative Forums</h4>
            {renderForums()}
        </div>
    );
};

// Connect this component to the 'forums' piece of the Redux state
const mapStateToProps = ({ forums }) => {
    return { forums };
};

// Connect the component to the `fetchForums` action creator
export default connect(mapStateToProps, { fetchForums })(ForumList);