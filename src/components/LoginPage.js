import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

const login = userActions.login;

const alertMessage ={
    registrationSuccess: 'Registration Successfull',
    loginFailed: 'Error: Username or password is incorrect'
};

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // console.log(e.target.name);
        // if(e.target.name === 'name') {
        //     this.setState({
        //         username : e.target.value
        //     })
        // } else {
        //     this.setState({
        //         password : e.target.value
        //     })
        // }

        const { name, value } = event.target;
        const userData = { ...this.state, [name]: value }
        //console.log("userData=" + JSON.stringify(userData));
        this.setState({
             ...userData
            //submitted: true
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const {username,password} = this.state;
        //console.log(username, password, 'submit', this.state)
        // const data = {username:username,password:password}
        if(username && password){
            this.props.login({username:username,password:password});
        }
        this.setState({
            submitted: true
        })
    }

    render() {
        const { username, password, submitted } = this.state;
        console.log(username, password,'this.props', this.props.username);
        
        // const {type, message} = this.props.username.alert;
        // const registerSuccess = this.props.username;
        // const {loggingIn = false} = this.props.username.authentication;
        const {authentication, alert} = this.props.username;
        //console.log(loggingIn, 'loggingIn')
        return (
            <div className="col-md-6 col-md-offset-3">

                {( alert && alert.message) && (<div className={`alert ${alert && alert.type}`} role="alert">
                    {alert.message}
                </div>)}

                <h2>Login</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={(e) => this.handleChange(e)}/>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" onChange={(e) => this.handleChange(e)}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Login</button>
                        {(authentication && authentication.loggingIn) && <span>Loading ...</span>}
                        <Link className="" to="/register">Register</Link>
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
        login: (data) => dispatch(userActions.login(data))
    }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedApp as LoginPage, connectedApp as TestLoginPage };
