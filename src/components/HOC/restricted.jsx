import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default (BaseComponent) => {
    class Restricted extends Component {
        componentWillMount() {
            this.checkAuthentication(this.props);
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location) {
                this.checkAuthentication(nextProps);
            }
        }
        checkAuthentication(params) {
            const { history } = params;
            if (!localStorage.getItem("access_token")) {
                history.replace({ pathname: '/login' })
            }
                // .catch(e => );
        }
        render() {
            return <BaseComponent {...this.props} />;
        }
    }
    return withRouter(Restricted);
}