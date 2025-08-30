import React from 'react';
import { Link } from 'react-router-dom';
import { getIconForSpecialty } from '../utils/iconHelper'; 

const SpecialistCard = ({ specialist }) => {
    return (
        <div className="themed-card">
            <div className="card-content center-align">
                <i className="material-icons" style={{ fontSize: '80px', margin: '20px 0' }}>
                    {getIconForSpecialty(specialist.specialty)}
                </i>
                <span className="card-title" style={{ display: 'block', fontWeight: 'bold' }}>{specialist.name}</span>
                <p><strong>{specialist.specialty}</strong></p>
                <p style={{ marginTop: '10px' }}>{specialist.shortBio}</p>
            </div>
            <div className="card-action">
                <Link to={`/specialists/${specialist._id}`}>View Full Profile</Link>
            </div>
        </div>
    );
};
export default SpecialistCard;