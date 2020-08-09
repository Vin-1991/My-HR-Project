import { hot } from 'react-hot-loader/root';
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import '../dist/scss/App.scss';

import Dashboards from '../components/dashboard';
import HRCentral from '../components/views/hr-central-tile';
import Login from '../components/login';
import HRRecruiter from '../components/views/hr-recruiter-dashboard';

const App = () => {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/hr_central_home" component={HRCentral} />
                    <Route exact path="/home" component={Dashboards} />
                    <Route exact path="/hr_recruiter_home" component={HRRecruiter} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </div>
    );
};

export default hot(App);

