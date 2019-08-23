import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class Headers extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Fragment>
        <Navbar expand="md" className="container" style={{height: "5rem"}}>
            <Link className="nav-link" to="/">
              <img
                style={{ width: "150px", height: "40px" }}
                src="./logo.png"
                alt="xedike-header-logo"
              />
            </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/login">Đăng Nhập</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link btn btn-success" to="/register">Đăng ký</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Lịch sử chuyến đi</DropdownItem>
                  <DropdownItem>Cài đặt tài khoản</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
