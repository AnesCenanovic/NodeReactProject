// src/components/UserCard.js

import React from 'react';

// This is a "presentational" component. It receives a single 'user' object as a prop
// and its only job is to display that user's information.
const UserCard = ({ user }) => {
    return (
        // These `className` values are all from the Materialize CSS framework.
        // This is the standard way to create a styled card.
        <div className="custom-card">
            
            <div className="card-content white-text">
                {/* The user's name will be the title of the card */}
                <span className="card-title">{user.name}</span>
                
                {/* We can also display other user data */}
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
            
            <div className="card-action">
                {/* For now, this is just a placeholder link. We will make it
                    work properly in the next major step. */}
                <a href={`/profile/${user._id}`}>View Profile</a>
            </div>

        </div>
    );
};

export default UserCard;