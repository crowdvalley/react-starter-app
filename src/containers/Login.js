import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Login from '../components/Login/Login'
import * as loginActions from '../actions/LoginActions'

class LoginCon extends Component {
    render() {
        const { login } = this.props;
        const { setUsername, setPassword, onLogin } = this.props.loginActions;

        return (
            <div className='sing-in'>
                <Login
                    username={login.username}
                    password={login.password}
                    requesting={login.requesting}
                    message={login.message}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    onLogin={onLogin}
                    loggedIn={login.loggedIn}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginCon)