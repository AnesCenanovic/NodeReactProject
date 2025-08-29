import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SpecialistDetailPage = () => {
    // The useParams hook from React Router gives us the ID from the URL
    const { id } = useParams(); 
    
    // We use component state to hold the specialist's data
    const [specialist, setSpecialist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This function runs when the component first loads
        const fetchSpecialist = async () => {
            try {
                setLoading(true);
                // We make a direct API call to get this one specialist
                const res = await axios.get(`/api/specialists/${id}`);
                setSpecialist(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching specialist details", err);
                setLoading(false);
            }
        };

        fetchSpecialist();
    }, [id]); // The effect re-runs if the ID in the URL changes

    if (loading) {
        return <div className="center-align"><h5>Loading specialist...</h5></div>;
    }

    if (!specialist) {
        return <div className="center-align"><h5>Specialist not found.</h5></div>;
    }

    // Once data is loaded, display it
    return (
        <div style={{ marginTop: '30px' }}>
            <div className="card">
                <div className="card-image">
                    <img src={specialist.profilePictureUrl} alt={specialist.name} style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <span className="card-title" style={{ textShadow: '2px 2px 4px #000000' }}>{specialist.name}</span>
                </div>
                <div className="card-content">
                    <h4>{specialist.specialty}</h4>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: '1.1em' }}>{specialist.fullBio}</p>
                    <hr style={{ margin: '20px 0' }} />
                    <h5>Contact Information</h5>
                    <p><strong>Email:</strong> {specialist.contactEmail || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {specialist.contactPhone || 'Not provided'}</p>
                </div>
            </div>
        </div>
    );
};

export default SpecialistDetailPage;