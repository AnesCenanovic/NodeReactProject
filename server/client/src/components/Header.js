import React, { useEffect } from 'react'; // <-- Change from Component to useEffect
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ForumInbox from './ForumInbox'; // <-- Import
import M from 'materialize-css'; // <-- Import Materialize JS

const Header = (props) => {
    // This effect runs after the component renders to initialize dropdowns
    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { coverTrigger: false });
    }, []);

    const renderContent = () => {
        switch (props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return (
                    <>
                        {/* Add the ForumInbox component here */}
                        <ForumInbox />
                        <li><Link to="/specialists">Specialists</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a href="/api/logout">Logout</a></li>
                    </>
                );
        }
    };
    
    // ... rest of the component is similar, just functional style ...
    return (
        <nav className="custom-header">
            <div className="nav-wrapper">
                <Link to={props.auth ? '/surveys' : '/'} className="brand-logo left" style={{ marginLeft: '10px' }}>
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);