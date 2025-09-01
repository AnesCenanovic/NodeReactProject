import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { fetchUsers } from '../actions'; 

const ProfileEditPage = (props) => {
    console.log('--- ProfileEditPage IS MOUNTING ---');
    const { userId } = useParams();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
        const loadUserData = async () => {
                    try {
                        const res = await axios.get(`/api/users/${userId}`);
            
                        setName(res.data.name);
                        setEmail(res.data.email);
                        setLoading(false); 
                    } catch (err) {
                        console.error("Failed to load user data for editing", err);
                        setError("Could not load user data. Please try again later.");
                        setLoading(false);
                    }
            };

        loadUserData();
    }, [userId]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.patch(`/api/users/${userId}`, { name, email });
            await props.fetchUsers();
            props.history.push(`/profile/${userId}`);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to save changes.");
        }
    };

    if (loading) return <div>Loading form...</div>;
     if (error) return <div style={{ color: 'red' }}>{error}</div>;

 return (
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="themed-form-container">
                    <h4>Edit Profile for {name}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                            <label htmlFor="name" className="active">Full Name</label>
                        </div>
                        <div className="input-field">
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email" className="active">Email</label>
                        </div>
                        
                        <div className="form-actions">
                            <Link to={`/profile/${userId}`} className="btn-flat red white-text">
                                Cancel
                            </Link>
                            <button type="submit" className="btn green">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { fetchUsers })(withRouter(ProfileEditPage));