import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SignUp from '../components/Signup/Signup'
import * as signUpActions from '../actions/SignupActions'

class SignUpCon extends Component {
    render() {
        const { signUp } = this.props;
        const { setUsername, setPassword, onRegister } = this.props.signUpActions;

        return (
            <div className='sign-up'>
                <SignUp
                    username={signUp.username}
                    email={signUp.email}
                    password={signUp.password}
                    requesting={signUp.requesting}
                    message={signUp.message}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    onRegister={onRegister}
                    user_id={signUp.data}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        signUp: state.signUp,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUpActions: bindActionCreators(signUpActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCon)