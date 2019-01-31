import {client} from '../Api/client.js';
import {
    AUTHORIZATION_REQUIRED,
} from '../constants/Default'
import Identicon from 'identicon.js';
import jsSHA from 'jssha';
import swal from 'sweetalert2'

export function ifCatchError(dispatch, error, dispatchStatus) {
    if (error.message === 'Network Error' || error.message === 'Request failed with status code 401') {
        dispatch(dispatchStatus.request);

        let username = localStorage.getItem("username");
        let token = localStorage.getItem("access_token");
        let refreshToken = localStorage.getItem("refresh_token");
        if(!username || !token || !refreshToken)
            clearLocalStorageAndAuth();
        client.auth.authRefresh(username, refreshToken)
            .then(response => {
                setAuthInfoInLocalStorage(response);
                client.setToken(username, response.data.data.id_token, response.data.data.refresh_token);

                localStorage.setItem("refresh_token_attempt", localStorage.getItem('refresh_token_attempt') + 1);
                if(localStorage.getItem('refresh_token_attempt') > 20) {
                    clearLocalStorageAndAuth();
                } else {
                    window.location.reload();
                }
            }).catch(error => {
            if (error.message === 'Request failed with status code 400' || error.message === 'Request failed with status code 401') {
                clearLocalStorageAndAuth()
            } else
                dispatch(dispatchStatus.failure);
        });
    } else {
        let errorMessage = error.message;
        if (error.response) {
            errorMessage = error.response.data.data.debug.message ? error.response.data.data.debug.message :
                (error.response.data.data.debug.name ? error.response.data.data.debug.name : error.response.code);

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            errorMessage = error.request;

            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

        swal({
            title: errorMessage,
            // text: 'Do you want to continue',
            type: 'error',
            confirmButtonText: 'Ok',
            timer: 5000,
        });
        dispatch(dispatchStatus.failure);
    }
    return true;
}

export function setAuthInfoInLocalStorage (response) {
    let user = parseJwt(response.data.data.id_token);
    localStorage.setItem("username", user.preferred_username);
    localStorage.setItem("email", user.email);
    localStorage.setItem("access_token", response.data.data.id_token);
    localStorage.setItem("refresh_token", response.data.data.refresh_token);
    if(response.data.data.apps) {
        localStorage.setItem("networks", JSON.stringify(response.data.data.apps));
        localStorage.setItem("network_api_key", response.data.data.apps[0].api_key);
        localStorage.setItem("network_id", response.data.data.apps[0].network_id);
    }

    return true;
}

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
}

export function clearLocalStorageAndAuth() {
    localStorage.clear();
    return (dispatch) => {
        dispatch({
            type: AUTHORIZATION_REQUIRED,
        });
    }
}

export function cloneObj(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export function isEmpty(obj) {
    let hasOwnProperty = Object.prototype.hasOwnProperty;
    // null and undefined are "empty"
    if (obj === null || obj === undefined) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function getAvatar(obj) {
    let shaObj, hash, avatar;
    if(!isEmpty(obj)) {
        shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(obj);
        hash = shaObj.getHash("HEX");
        avatar = new Identicon(hash, {format: 'svg'}).toString();
    } else
        avatar = null;

    return avatar;
}

export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj =>
            mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};

