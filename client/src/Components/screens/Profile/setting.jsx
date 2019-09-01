import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Card,
  CardImg,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { MoreVert,  AccountCircle } from "@material-ui/icons";

import DriverSection from './driver-section'

const styles = {
  iconsGeneral: {
    fontSize: "2rem",
    marginRight: "1rem"
  },
  avatarDefault: {
    color: "#333",
    fontSize: "8rem"
  },
  formCSS: {
    backgroundColor: "#fff"
  }
};

class SettingProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullName: "",
      phone: "",
      DOB: "",
      avatar: "",
      registerDate: "",
      numberOfTrips: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/users/${this.props.auth.user._id}`)
      .then(res => {
        const formatedDOB = moment(res.data.DOB, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        );
        const formatedRGD = moment(res.data.registerDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        );
        this.setState({
          email: res.data.email,
          fullName: res.data.fullName,
          phone: res.data.phone,
          avatar: res.data.avatar,
          DOB: formatedDOB,
          numberOfTrips: res.data.numberOfTrips,
          registerDate: formatedRGD
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div
          className="shadow-sm rounded px-5 py-4 my-5"
          style={styles.formCSS}
        >
          <Row className="d-flex justify-content-between mb-5">
            <div>
              <div className="h4">
                <AccountCircle
                  style={styles.iconsGeneral}
                  className="float-left"
                />{" "}
                General Information
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle>
                <MoreVert style={{ fontSize: "1.3rem" }} />
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/setting/profile-general">
                  <DropdownItem>Edit</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <div className="avatar">
                <Card
                  body
                  inverse
                  style={{
                    backgroundColor: "#fff",
                    border: "none",
                    padding: "0"
                  }}
                >
                  {this.state.avatar ? (
                    <CardImg
                      style={{ width: 150, height: 150 }}
                      className="rounded-circle mb-3"
                      src={`http://localhost:8080/${this.state.avatar}`}
                      alt="Card image cap"
                    />
                  ) : (
                    <AccountCircle style={styles.avatarDefault} />
                  )}
                </Card>
              </div>
              <div className="informationGeneral mt-2">
                <p>
                  User:{" "}
                  <span className="font-italic h5 mb-3">
                    {this.state.fullName}
                  </span>
                </p>
                <p>
                  Register Day:{" "}
                  <span className="font-weight-light h6">
                    {this.state.registerDate}
                  </span>
                </p>
                <p>
                  Number of trips:{" "}
                  <span className="font-weight-light h6">
                    {this.state.numberOfTrips}{" "}
                  </span>
                </p>
              </div>
            </Col>
            <Col md={8}>
              <Form>
                <FormGroup row>
                  <Label for="stGeneralEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="stGeneralEmail"
                      placeholder="with a placeholder"
                      value={this.state.email}
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="stGeneralPassword" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="stGeneralPassword"
                      id="stGeneralPassword"
                      placeholder="********"
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="stGeneralPhone" sm={2}>
                    Phone
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="phone"
                      id="stGeneralPhone"
                      placeholder="password placeholder"
                      disabled
                      value={this.state.phone}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="stGeneralDOB" sm={2}>
                    Birthday
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="DOB"
                      id="stGeneralDOB"
                      placeholder="password placeholder"
                      disabled
                      value={this.state.DOB}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
        <div>
            <DriverSection />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(SettingProfile);
