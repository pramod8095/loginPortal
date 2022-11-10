import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import  HomePage  from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

import { Provider } from 'react-redux';
import { store } from './helpers/store';

export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container">
                <Router history={history}>
                    <div className="col-sm-8 col-sm-offset-2">
                        {/* <LoginPage /> */}
                        <Route  path="/Login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <PrivateRoute exact path="/home" component={HomePage} />

                        
                    </div>
                </Router>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}