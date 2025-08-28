import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Profile from './Profile';
import Header from './Header';
import Sidebar from './Sidebar'; // Import Sidebar
import Dashboard from './Dashboard'; // Import Dashboard

const SurveyNew = () => (
    <h2>SurveyNew</h2>
);

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Sidebar /> {/* Always render Sidebar */}
                    <div className="container" style={{ marginRight: 250 }}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        <Route path="/profile" component={Profile} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);