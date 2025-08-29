import React from 'react';
import { Link } from 'react-router-dom';

const SpecialistCard = ({ specialist }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={specialist.profilePictureUrl} alt={specialist.name} style={{ height: '250px', objectFit: 'cover' }} />
                <span className="card-title">{specialist.name}</span>
            </div>
            <div className="card-content">
                <p><strong>{specialist.specialty}</strong></p>
                <p>{specialist.shortBio}</p>
            </div>
            <div className="card-action">
                <Link to={`/specialists/${specialist._id}`}>View Full Profile</Link>
            </div>
        </div>
    );
};

export default SpecialistCard;