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
        <div>
            {}
            <div className="dashboard-container">
                {/* Left column: The new navigation */}
                <DashboardNav activeView={activeView} setActiveView={setActiveView} />

                {/* Middle column: The dynamically rendered content */}
                <div className="main-content">
                    {renderContent()}
                </div>

                {/* Right column: The user sidebar */}
                <Sidebar />
            </div>

            {/* The dynamically rendered Floating Action Button */}
            <div className="fixed-action-btn">
                {renderCreateButton()}
            </div>
        </div>
    );
};

export default Dashboard;