import React from 'react';
import { Link } from 'react-router-dom';
import { getIconForSpecialty } from '../utils/iconHelper'; 

const SpecialistCard = ({ specialist }) => {
    if (!specialist || !specialist._id) {
        return null;
    }

    return (
        // The entire card is a link, using our new style
        <Link to={`/specialists/${specialist._id}`} className="info-card">
            
            <div className="info-card-header">
                <i className="material-icons info-card-icon">
                    {getIconForSpecialty(specialist.specialty)}
                </i>
                <div>
                    <h5>{specialist.name}</h5>
                    <p>{specialist.specialty}</p>
                </div>
            </div>
            
            <div className="info-card-body">
                <p><strong>About:</strong> {specialist.shortBio}</p>
                
                {/* We can add contact info directly to the card */}
                <div style={{ marginTop: '15px' }}>
                    <p><strong>Email:</strong> {specialist.contactEmail || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {specialist.contactPhone || 'Not provided'}</p>
                </div>
            </div>

        </Link>
    );
};

export default SpecialistCard;