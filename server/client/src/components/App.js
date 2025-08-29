import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Profile from './Profile';
import Header from './Header';
import Dashboard from './Dashboard';
import PostCreate from './PostCreate'; 
import PostDetail from './PostDetail';

import './App.css';

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
                    <div className="container" style={{ marginRight: 250 }}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/posts/new" component={PostCreate} />
                        <Route exact path="/posts/:postId" component={PostDetail} /> 
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);