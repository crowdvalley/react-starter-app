import {
    SET_USERNAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_USER_ID,
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILURE,
} from '../constants/Signup.js'

const initialState = {
    username: '',
    email: '',
    password: '',
    requesting: false,
    message: '',
    data: ''
};

export default function register(state = initialState, action) {

    switch (action.type) {
        case SET_USERNAME:
            return {...state,
                username: action.payload.value
            };

        case SET_EMAIL:
            return {...state,
                email: action.payload.value
            };

        case SET_PASSWORD:
            return {...state,
                password: action.payload.value
            };

        case SET_USER_ID:
            return {...state,
                user_id: action.payload.value
            };

        case POST_REGISTER_REQUEST:
            return {...state,
                requesting: action.payload.requesting
            };

        case POST_REGISTER_SUCCESS:
            return {...state,
                requesting: action.payload.requesting,
                message: action.payload.message,
                data: action.payload.data
            };

        case POST_REGISTER_FAILURE:
            return {...state,
                requesting: action.payload.requesting,
                message: action.payload.message
            };

        default:
            return state;
    }
}