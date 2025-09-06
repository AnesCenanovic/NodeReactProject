import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = ({ auth }) => {
    return (
        <div className="landing-page">
            
            <div className="hero-section">
                <h1>
                    Welcome to <span className="brand-highlight">IncluEd</span>
                </h1>
                <p className="subtitle">
                    A unified educational platform designed to foster digital inclusion and empower the collaborative care teams for children with Down syndrome.
                </p>
                {auth ? (
                    <Link to="/surveys" className="btn-large cta-button">
                        Go to Your Dashboard
                    </Link>
                ) : (
                    <a href="/auth/google" className="btn-large cta-button">
                        Login With Google
                    </a>
                )}
            </div>

            {/* --- FEATURES SECTION --- */}
            {/* This section highlights what the app can do */}
            <div className="features-section">
                <div className="container">
                    <h2>Everything in One Place</h2>
                    <div className="feature-grid">
                        
                        <div className="feature-item">
                            <i className="material-icons">forum</i>
                            <h5>Collaborative Forums</h5>
                            <p>Plan workshops, events, and seminars. Invite members and work together as a unified team.</p>
                        </div>

                        <div className="feature-item">
                            <i className="material-icons">article</i>
                            <h5>Shared Knowledge Base</h5>
                            <p>Create and share articles, guides, and research papers for the entire community to benefit from.</p>
                        </div>

                        <div className="feature-item">
                            <i className="material-icons">groups</i>
                            <h5>Specialist Directory</h5>
                            <p>Find and connect with vetted therapists, logopeds, and other specialists, complete with reviews from parents.</p>
                        </div>
                        
                        <div className="feature-item">
                            <i className="material-icons">chat</i>
                            <h5>Real-Time Chat</h5>
                            <p>Enable direct, private, and secure communication between parents, educators and specialists.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* You could add more sections like a "Mission Statement" or "Testimonials" here */}
            
        </div>
    );
}

// We need to know if the user is logged in to show the correct button in the hero
const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps)(Landing);