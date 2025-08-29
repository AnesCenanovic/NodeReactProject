import React from 'react';

const DashboardNav = ({ activeView, setActiveView }) => {
    return (
        <div>
            <h5>Navigation</h5>
            <div className="collection">
                {/* 
                    When the "Posts" link is clicked, it calls setActiveView('posts').
                    We dynamically add the 'active' class if the current view is 'posts'.
                */}
                <a 
                    href="#!" 
                    onClick={() => setActiveView('posts')}
                    className={`collection-item ${activeView === 'posts' ? 'active' : ''}`}
                >
                    Posts
                </a>
                
                {/* 
                    When the "Forums" link is clicked, it calls setActiveView('forums').
                */}
                <a 
                    href="#!"
                    onClick={() => setActiveView('forums')}
                    className={`collection-item ${activeView === 'forums' ? 'active' : ''}`}
                >
                    Forums
                </a>
            </div>
        </div>
    );
};

export default DashboardNav;