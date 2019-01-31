import {client} from '../Api/client.js';
import {
    SET_USERNAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_ID,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILURE,
} from '../constants/Signup';

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

export function setUserId(value) {
    return (dispatch) => {
        dispatch({
            type: SET_USER_ID,
            payload: {
                value: value,
            }
        });
    }
}

export function setEmail(value) {
    return (dispatch) => {
        dispatch({
            type: SET_EMAIL,
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

export function onRegister(obj) {
    return (dispatch) => {
        dispatch({
            type: POST_REGISTER_REQUEST,
            payload: {
                requesting: true,
            }
        });
        client.publicApi.publicSignup(obj)
            .then(response => {
                console.log(response);
                dispatch({
                    type: POST_REGISTER_SUCCESS,
                    payload: {
                        requesting: false,
                        message: "Successfully Registered",
                        data: response.data.data
                    }
                });
            }).catch(error => {
            dispatch({
                type: POST_REGISTER_FAILURE,
                payload: {
                    requesting: false,
                    message: typeof error.response !== 'undefined' ? error.response.data.data.debug.message : "Registration Failed",
                }
            });
        });
    }
}