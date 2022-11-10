import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

const alertMessage = {
    registrationSuccess: 'Registration Successfull',
    loginFailed: 'Error: Username or password is incorrect'
};

function login(user) {
    console.log(user, 'in user action')
    // return the promise using fetch which adds to localstorage on resolve
    return dispatch => {
        dispatch(request(user));
        console.log(user, 'in action')
        userService.login(user.username, user.password)
            .then(res => {
                console.log("login userservice success")
                history.push("/home");
                dispatch(success(user));
                dispatch(alertActions.success(alertMessage.registrationSuccess));
                //success(user);
            })
            .catch(err => {
                console.log(err);
                dispatch(alertActions.error(alertMessage.loginFailed));
                dispatch(failure(err));
            })
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

// function logout() {
//     // complete this function
//     console.log('Logout')    
//     return dispatch => {
//         //localStorage.clear();
//         localStorage.removeItem('users');
//         dispatch({type: userConstants.LOGOUT});

//         dispatch(alertActions.clear());
//     }
// }

function logout() {
    // complete this function
    console.log('Logout')

    userService.logout();
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
        //dispatch(alertActions.clear());
    }
    //return { type: userConstants.LOGOUT };

    //return true;


}

function register(user) {
    // return the promise using fetch which dispatches appropriately 

    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(res => {
                history.push("/login");
                dispatch(success(user));
                dispatch(alertActions.success(alertMessage.registrationSuccess));
                //success(user);
            })
        // .catch(err => {
        //     console.log(err);
        //     dispatch(failure(err));
        // })
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
