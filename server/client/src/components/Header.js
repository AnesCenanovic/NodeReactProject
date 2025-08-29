import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                    return (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li><Link to="/specialists">Specialists</Link></li>
                        <li>
                            <a href="/api/logout">Logout</a>
                        </li>
                    </>
                );
        }
    }
    render() {
        console.log('Header is rendering with auth:', this.props.auth);
        return (
            <nav className="custom-header">
                <div className="nav-wrapper">
                    <Link 
                        to={
                            this.props.auth ? '/surveys' : '/'
                        } 
                        className="brand-logo left"
                        style={{ marginLeft: '10px' }}>
                            Emaily
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth};
}

export default connect(mapStateToProps)(Header);