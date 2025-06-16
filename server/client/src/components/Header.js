import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo left">Emaily</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/">Login with Google</a></li>
                        <li><a href="/surveys">Dashboard</a></li>
                        <li><a href="/surveys/new">New Survey</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;