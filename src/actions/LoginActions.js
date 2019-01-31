import {client} from '../Api/client.js';
import {
    SET_USERNAME,
    SET_PASSWORD,
    SHOW_PASSWORD,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/Login'
import {setAuthInfoInLocalStorage, removeDuplicates} from './DefaultActions'

export function setUsername(value) {
    return (dispatch) => {
        dispatch({
            type: SET_USERNAME,
            payload: {
                value: value,
            }
        });
    }
}

export function setPassword(value) {
    return (dispatch) => {
        dispatch({
            type: SET_PASSWORD,
            payload: {
                value: value,
            }
        });
    }
}

export function onLogin(obj) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                requesting: true,
            }
        });

        client.auth.publicAuthToken(obj)
            .then(response => {
                setAuthInfoInLocalStorage(response);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        requesting: false,
                    }
                });
            }).catch(error => {
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    requesting: false,
                    message: "Incorrect username or password",
                }
            });
        });
    }
}