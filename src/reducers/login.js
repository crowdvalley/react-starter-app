import {
    SET_USERNAME,
    SET_PASSWORD,
    SHOW_PASSWORD,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/Login'

const initialState = {
    username: '',
    password: '',
    requesting: false,
    showPassword: false,
    message: '',
};

export default function login(state = initialState, action) {

    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.payload.value };

        case SET_PASSWORD:
            return { ...state, password: action.payload.value };

        case LOGIN_REQUEST:
            return { ...state, requesting: action.payload.requesting };

        case LOGIN_SUCCESS:
            return { ...state, requesting: action.payload.requesting };

        case LOGIN_FAILURE:
            return { ...state, requesting: action.payload.requesting, message: action.payload.message };

        default:
            return state;
    }
}
