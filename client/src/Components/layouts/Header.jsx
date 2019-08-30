import React, { Component } from "react";

import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
//font marterial
import { AccountCircle, SupervisorAccount, History } from "@material-ui/icons";

//sytle
const styles = {
  iconsUser: {
    fontSize: "3rem"
  },
  iconsDropdown: {
    fontSize: "1.5rem",
    marginRight: "1rem"
  }
};

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClickLogOut = () => {
    this.props.actionLogOut();
  };

  render() {
    const navbarForAnonymous = (
      <Nav className="ml-auto" navbar>
        <NavItem className="nav-link">
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem className="nav-link">
          <Link to="/register">Register</Link>
        </NavItem>
      </Nav>
    );
    const navbarForLoggedInUser = (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {/* <img src="./images/icons/user-avatar-default.png" alt="..." className="rounded-circle" style={{width: "30px", height: "30px"}} /> */}
            {this.props.auth.user.avatar ? (
              <img
                src={`http://localhost:8080/${this.props.auth.user.avatar}`}
                alt="avatar-passenger-xedike"
                className="rounded-circle"
                style={{ width: "30px", height: "30px" }}
              />
            ) : (
              <AccountCircle style={styles.iconsUser} />
            )}
          </DropdownToggle>
          <DropdownMenu right className="shadow-sm rounded" >
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <DropdownItem>
                <SupervisorAccount style={styles.iconsDropdown} />
                Profile
              </DropdownItem>
            </Link>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <DropdownItem>
                <History style={styles.iconsDropdown} />
                History trips
              </DropdownItem>
            </Link>
            <DropdownItem divider />
            <DropdownItem onClick={this.handleOnClickLogOut}>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
    return (
      <Navbar
        color="light"
        light
        expand="md"
        className="border-bottom border-light"
        style={{ boxShadow: "0px 1px 5px #00000020" }}
      >
        <div className="container">
          <Link to="/" className="nav-link">
            <img src="./logo.png" alt="" style={{ width: "7rem" }} />
          </Link>
          {this.props.auth.isAuthenticated
            ? navbarForLoggedInUser
            : navbarForAnonymous}
        </div>
      </Navbar>
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
    actionLogOut: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Headers);