import {userConstants} from '../actions';
import {userSerivce} from '../services';
import {alertActions} from './alert.actions';
import {history} from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user=> {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {return {type: userConstants.LOGIN_REQUEST, user}}
    function success(user) {return {type: userConstants.LOGIN_SUCCEES, user}}
    function request(error) {return {type: userConstants.LOGIN_FAILURE, error}}
}

function logout(){
    userService.logout();
    return {type: userConstants.LOGOUT}
}

function register(user){
    return dispatch => {
        dispatch(request(user));

        userSerivce.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success("Registration Successful"));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) {return {type: userConstants.REGISTER_REQUEST, user}}
    function success(user) {return {type: userConstants.REGISTER_SUCCESS, user}}
    function failure(user) {return {type: userConstants.REGISTER_FAILURE, error}}
}

function getAll(){
    return dispatch => {
        dispatch (request());

        userSerivce.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(){ return {type: userConstants.GETALL_REQUEST}}
    function success(){ return {type: userConstants.GETALL_SUCCESS, users}}
    function failure(){ return {type: userConstants.GETALL_FAILURE, error}}
}

function _delete(id){
    return dispatch => {
        dispatch(request(id));

        userSerivce.delete(id)
            .then(
                user=> {
                    dispatch(success(id));
                },
                error=> {
                    dispatch(failure(id,error));
                }
            );
    };
    function request(id) {return {type: userConstants.DELETE_REQUEST, id}}
    function success(id) {return {type: userConstants.DELETE_SUCCESS, id}}
    function failure(id, error) {return {type: userConstants.DELETE_FAILURE, error}}
}
