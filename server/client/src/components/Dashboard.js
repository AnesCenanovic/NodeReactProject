import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';       
import PostList from './PostList';     
import ForumList from './ForumList';   
import DashboardNav from './DashboardNav'; 

const Dashboard = () => {
    const [activeView, setActiveView] = useState('posts');

    const renderContent = () => {
        if (activeView === 'forums') {
            return <ForumList />;
        }
        return <PostList />;
    };

    const renderCreateButton = () => {
        if (activeView === 'forums') {
            return (
                <Link to="/forums/new" className="btn-floating btn-large red">
                    <i className="material-icons">add</i>
                </Link>
            );
        }
        return (
            <Link to="/posts/new" className="btn-floating btn-large red">
                <i className="material-icons">add</i>
            </Link>
        );
    };

        return (
                // The main layout wrapper with our new CSS Grid class
                <div className="dashboard-layout">
                    
                    {/* Left Column: The Navigation */}
                    <div className="dashboard-nav">
                        <DashboardNav activeView={activeView} setActiveView={setActiveView} />
                    </div>

                    {/* Middle Column: The Main, Scrollable Content */}
                    <div className="dashboard-main">
                        {renderContent()}
                    </div>

                    {/* Right Column: The User Sidebar */}
                    <div className="dashboard-users">
                        <Sidebar />
                    </div>

                    {/* The Floating Action Button (its position is fixed, so it's fine outside the grid) */}
                    <div className="fixed-action-btn">
                        {renderCreateButton()}
                    </div>
                </div>
            );
};

export default Dashboard;