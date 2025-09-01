import React from 'react';
import { connect } from 'react-redux';

const DashboardHero = ({ auth }) => {
    if (!auth) return null;

    return (
        <div className="hero-section">
            <h1>Welcome back, {auth.name.split(' ')[0]}!</h1>
            <p>Your central hub for collaboration and educational resources.</p>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(DashboardHero);
