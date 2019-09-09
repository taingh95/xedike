import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
//font marterial
import { AccountCircle, SupervisorAccount, History } from "@material-ui/icons";
import CreateTripModal from "./Create-Trip-Modal";
import swal from "sweetalert";

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
    this.state = {
      toggleModal: false
    };
  }

  handleOnClickLogOut = () => {
    this.props.actionLogOut();
  };
  handleOnClickModal = () => {
    if (this.props.auth.user.userType.indexOf("driver") === -1) {
      swal(
        "Failed!",
        "You are a not driver! Please register driver to continue",
        "warning"
      );
    } else if (
      this.props.driver.isActive === false &&
      this.props.driver.carInfo.length === 0
    ) {
      swal("Failed!", "Please update your driver infomation", "warning");
    } else {
      this.setState({
        toggleModal: !this.state.toggleModal
      });
    }
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
        <Button
          color="secondary"
          className="mr-3"
          onClick={this.handleOnClickModal}
        >
          + Create new trip
        </Button>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
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
          <DropdownMenu right className="shadow-sm rounded">
            <Link to="/setting" style={{ textDecoration: "none" }}>
              <DropdownItem>
                <SupervisorAccount style={styles.iconsDropdown} />
                My Profile
              </DropdownItem>
            </Link>
            <Link to="/setting" style={{ textDecoration: "none" }}>
              <DropdownItem>
                <History style={styles.iconsDropdown} />
                My History Trips
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
      <Fragment>
        <Navbar
          color="light"
          light
          expand="md"
          className="border-bottom border-light main-header"
          style={{ boxShadow: "0px 1px 5px #00000020" }}
        >
          <div className="container">
            <Link to="/" className="nav-link">
              <img
                src="http://localhost:8080/uploads/logo.png"
                alt=""
                style={{ width: "7rem" }}
              />
            </Link>
            {this.props.auth.isAuthenticated
              ? navbarForLoggedInUser
              : navbarForAnonymous}
          </div>
        </Navbar>
        <CreateTripModal
          toggleModal={this.state.toggleModal}
          actionHandleOnClickModal={this.handleOnClickModal}
        />
      </Fragment>
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
    actionLogOut: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Headers);
