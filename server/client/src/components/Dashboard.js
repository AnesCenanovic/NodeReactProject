import React from 'react';
import Sidebar from './Sidebar'; // Make sure to import the Sidebar

const Dashboard = () => {
  return (
    // We apply the 'dashboard-container' class we just defined in our CSS
    <div className="dashboard-container">
      
      {/* This div holds the main part of your page */}
      <div className="main-content">
        <h2>Dashboard</h2>
        <p>This is the main content area.</p>
        {/* A tall div just to demonstrate scrolling */}
        <div style={{ height: '2000px' }}></div> 
      </div>
      
      {/* The Sidebar component goes here, as a sibling to the main content */}
      <Sidebar />
      
    </div>
  );
};

export default Dashboard;