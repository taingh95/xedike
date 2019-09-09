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
import { setCurrentUser, setCurrentDriver ,logoutUser } from "./actions/auth";
import {loadMyProfile} from './actions/user-profile'
import setHeader from './helper/setHeader'
import Profile from "./Components/screens/Profile";
import NotFound from './Components/screens/NotFound'
import Footer from "./Components/screens/Footer";
import DriverProfile from "./Components/screens/Profile/driver-profile"
import SettingProfile from './Components/screens/Profile/setting'
import Filter from './Components/screens/Filter'
import CurrentTrips from './Components/layouts/current-trip'
import axios from "axios";


class App extends Component {

  componentDidMount() {
    //auto login
    const token = localStorage.getItem("token");
    if(!token) return;
    const decoded = jwtDecode(token)
    this.props.actionloadMyProfile(decoded.payload._id)
    setHeader(token)
    //log out
    if((Date.now() / 1000) > decoded.exp) {
      return this.props.actionLogOut()
    };
    if(decoded.payload.userType.indexOf("driver")) {
      return axios.get(`http://localhost:8080/api/drivers/${decoded.payload._id}`).then(res => {
        this.props.actionSetCurrentDriver(res.data)
      })
    }

  }

  render() {
    const isAuthentication = this.props.auth.isAuthenticated
    return (
      <div className="App">
        <Router>
          <Headers history={this.props.history} />
          {isAuthentication ? <CurrentTrips /> : null}
          <Route path="/" exact component={Home}  />
          <Route path="/login" exact component={authLogin} />
          <Route path="/register" exact component={authRegiser} />
          <Route path="/setting/profile-general" exact  component={isAuthentication ? Profile : NotFound} />
          <Route path="/setting/profile-driver" exact  component={isAuthentication ? DriverProfile : NotFound} />
          <Route path="/setting" exact  component={isAuthentication ? SettingProfile : NotFound} />
          <Route path="/result" exact  component={Filter} />
          <Route path="/not-found-404" exact  component={NotFound} />
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    driver: state.driver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionSetCurrentUser: (data) => dispatch(setCurrentUser(data)),
    actionLogOut: () => dispatch(logoutUser()),
    actionloadMyProfile: (id) => dispatch(loadMyProfile(id)),
    actionSetCurrentDriver: (data) => dispatch(setCurrentDriver(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
