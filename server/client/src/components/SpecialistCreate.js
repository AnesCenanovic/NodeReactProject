import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const SpecialistCreate = (props) => {
    // State for each form field
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [shortBio, setShortBio] = useState('');
    const [fullBio, setFullBio] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newSpecialist = {
            name, specialty, shortBio, fullBio, contactEmail, contactPhone
        };

        try {
            // Make a direct POST request to the backend
            await axios.post('/api/specialists', newSpecialist);
            
            // Redirect to the main specialists page on success
            props.history.push('/specialists');
        } catch (error) {
            console.error("Error creating specialist:", error);
            // You could add error message handling here
        }
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h4>Add a New Specialist</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor="name">Full Name</label>
                </div>

                <div className="input-field">
                    <input id="specialty" type="text" value={specialty} onChange={e => setSpecialty(e.target.value)} />
                    <label htmlFor="specialty">Specialty (e.g., Therapist, Logoped)</label>
                </div>

                <div className="input-field">
                    <textarea id="shortBio" className="materialize-textarea" value={shortBio} onChange={e => setShortBio(e.target.value)}></textarea>
                    <label htmlFor="shortBio">Short Bio (for preview card)</label>
                </div>

                <div className="input-field">
                    <textarea id="fullBio" className="materialize-textarea" style={{ height: '200px' }} value={fullBio} onChange={e => setFullBio(e.target.value)}></textarea>
                    <label htmlFor="fullBio">Full Bio / Details</label>
                </div>

                <div className="input-field">
                    <input id="contactEmail" type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
                    <label htmlFor="contactEmail">Contact Email</label>
                </div>
                
                <div className="input-field">
                    <input id="contactPhone" type="text" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                    <label htmlFor="contactPhone">Contact Phone</label>
                </div>

                <button type="submit" className="btn green right">
                    Save Specialist
                </button>
            </form>
        </div>
    );
};

// We wrap with `withRouter` to give the component access to `props.history` for redirection
export default withRouter(SpecialistCreate);