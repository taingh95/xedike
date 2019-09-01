import React, { Component } from "react";

import "./App.css";
//React router
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import Headers from "./Components/layouts/Header";
import authLogin from "./Components/auth/Login";
import authRegiser from "./Components/auth/Register";
import Home from "./Components/screens/Home";
import { setCurrentUser, logoutUser } from "./actions/auth";
import {loadMyProfile} from './actions/user-profile'
import setHeader from './helper/setHeader'
import Profile from "./Components/screens/Profile";
import NotFound from './Components/screens/NotFound'
import Footer from "./Components/screens/Footer";
import DriverProfile from "./Components/screens/Profile/driver-profile"
import SettingProfile from './Components/screens/Profile/setting'

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(!token) return;
    const decoded = jwtDecode(token)
    this.props.actionloadMyProfile(decoded.payload._id)
    setHeader(token)
    if(Date.now() / 2000 > decoded.exp) {
      this.props.actionLogOut()
    }
  }

  render() {
    const isAuthentication = this.props.auth.isAuthenticated
    return (
      <div className="App">
        <Router>
          <Headers  />
          <Route path="/" exact component={Home}  />
          <Route path="/login" exact component={authLogin} />
          <Route path="/register" exact component={authRegiser} />
          <Route path="/setting/profile-general" exact  component={isAuthentication ? Profile : NotFound} />
          <Route path="/setting/profile-driver" exact  component={isAuthentication ? DriverProfile : NotFound} />
          <Route path="/setting" exact  component={isAuthentication ? SettingProfile : NotFound} />
          <Route path="/not-found-404" exact  component={NotFound} />
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionSetCurrentUser: (data) => dispatch(setCurrentUser(data)),
    actionLogOut: () => dispatch(logoutUser()),
    actionloadMyProfile: (id) => dispatch(loadMyProfile(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
