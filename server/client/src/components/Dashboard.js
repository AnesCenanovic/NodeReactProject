import React, { useState } from 'react'; // <-- 1. Import useState
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';       // User sidebar (right)
import PostList from './PostList';     // The list of posts
import ForumList from './ForumList';   // The list of forums
import DashboardNav from './DashboardNav'; // <-- 2. Import our new navigation component

const Dashboard = () => {
    // 3. Set up the component's state.
    // 'activeView' will hold the name of the view to show.
    // We'll default it to 'posts'.
    const [activeView, setActiveView] = useState('posts');

    // 4. A helper function to render the correct list based on the state.
    const renderContent = () => {
        if (activeView === 'forums') {
            return <ForumList />;
        }
        // By default, show the PostList.
        return <PostList />;
    };

    // 5. A helper function to render the correct "Create" button.
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
            {/* We're back to the 3-column layout */}
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