import React, { useEffect } from 'react'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import M from 'materialize-css'; 

const Header = (props) => {
    // This effect runs after the component renders to initialize dropdowns
    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { coverTrigger: false });
    }, [props.auth]); // Re-run if auth status changes

    const renderContent = () => {
        switch (props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return (
                    <>  
                        <li><Link to="/specialists">Specialists</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        {props.auth && props.auth.role === 'admin' && (
            <li><Link to="/admin/files">File Archive</Link></li>
        )}
                        <li><Link to="/files">File Share</Link></li>
                        <li><Link to="/inbox">My Activity</Link></li>
                        <li><a href="/api/logout">Logout</a></li>
                    </>
                );
        }
    };
    
    return (
        <nav className="themed-header">
            <div className="nav-wrapper">
                <Link to={props.auth ? '/surveys' : '/'} className="brand-logo left" style={{ marginLeft: '10px' }}>
                    IncluEd
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