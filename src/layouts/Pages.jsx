import React from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import pagesRoutes from "routes/pages.jsx";
import '../App.css';

class Pages extends React.Component {
    handleLogOut = () => {
        localStorage.clear();
    };
  render() {
    return (
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">DIFITEK</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {!localStorage.getItem("access_token") ? <LinkContainer to="/register"><NavItem>Sign Up</NavItem></LinkContainer> : ''}
                        {
                          localStorage.getItem("access_token") ?
                          <LinkContainer to="/login" onClick={this.handleLogOut}><NavItem>Log Out</NavItem></LinkContainer>
                        :
                          <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                {pagesRoutes.map((prop, key) => {
                    if (prop.collapse) {
                        return null;
                    }
                    if (prop.redirect) {
                        return (
                            <Redirect from={prop.path} to={prop.pathTo} key={key} />
                        );
                    }
                    return (
                        <Route
                            path={prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                })}
            </Switch>
        </div>
    );
  }
}

export default (Pages);
