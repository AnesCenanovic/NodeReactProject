import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Profile from './Profile';
import Header from './Header';
import Dashboard from './Dashboard';
import PostCreate from './PostCreate'; 
import PostDetail from './PostDetail';
import ForumCreate from './ForumCreate';
import SpecialistsPage from './SpecialistsPage';
import SpecialistDetailPage from './SpecialistDetailPage';
import SpecialistCreate from './SpecialistCreate';
import ForumDetailPage from './ForumDetailsPage';

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
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                            <Route path="/profile/:userId?" component={Profile} />
                            <Route path="/posts/new" component={PostCreate} />
                            <Route exact path="/posts/:postId" component={PostDetail} />
                            <Route exact path="/forums/new" component={ForumCreate} />
                            <Route exact path="/specialists" component={SpecialistsPage} />
                            <Route exact path="/specialists/:id" component={SpecialistDetailPage} />
                            <Route exact path="/admin/specialists/new" component={SpecialistCreate} />
                            <Route exact path="/forums/:id" component={ForumDetailPage} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);