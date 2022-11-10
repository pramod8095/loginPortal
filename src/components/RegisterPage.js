import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

 class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // handle input change and dispatch register
        event.preventDefault();
        const { name, value } = event.target;
        const userData = { ...this.state.user, [name]: value }
        //console.log("userData=" + JSON.stringify(userData));
        this.setState({
            user: userData,
            submitted: true
        });
    }

    handleSubmit(event) {
        // handle button click and dispatch register
        event.preventDefault();
        //console.log(this.state.user, 'props', this.props.username);
        this.props.register(this.state.user);
    }

    render() {
        const { user, submitted } = this.state;
        //console.log(this.props, 'register')
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={(e) => { this.handleChange(e) }}/>
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={(e) => { this.handleChange(e) }} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={(e) => { this.handleSubmit(e) }}>Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    return {
        username: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => dispatch(userActions.register(data))
    }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export { connectedApp as RegisterPage, connectedApp as TestRegisterPage };
