import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import { MoreVert, AccountCircle, Star } from "@material-ui/icons";
import BecomeDriverSection from "../../layouts/Become-Driver-Section";
import CarSectionPopup from "./Car-section-popup";

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

class DriverSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: false,
      tripSuccessed: "",
      address: "",
      passportId: "",
      mainJob: "",
      avatar: "",
      fullName: "",
      carBrand: "",
      car: "",
      rated: 0,
      //ui state
      toggleModal: false
    };
  }
  componentDidMount() {
    if (this.props.auth.user.userType.indexOf("driver") !== -1) {
      this.setState({
        userType: true
      });
      axios
        .get(`http://localhost:8080/api/drivers/${this.props.auth.user._id}`)
        .then(res => {
          this.setState({
            tripSuccessed: res.data.tripSuccess,
            address: res.data.address,
            passportId: res.data.passportId,
            mainJob: res.data.mainJob,
            avatar: this.props.auth.user.avatar,
            fullName: this.props.auth.user.fullName,
            rated: res.data.passengersRates,
            // carBrand: res.data.carInfo[0].brand,
            car: res.data.carInfo[0]
          });
        })
        .catch(err => console.log(err));
    }
  }

  //UI logic
  actionToggleModal = e => {
    e.preventDefault();
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  };

  render() {
    const notHasProfile = (
      <div className="shadow-sm rounded px-5 py-4 my-5" style={styles.formCSS}>
        <Link to="/setting/profile-driver">
          <button className="h3 btn btn-block btn-secondary">
            Upgrade Your Driver's Profile To Start
          </button>
        </Link>
      </div>
    );
    const hadProfile = (
      <div className="shadow-sm rounded px-5 py-4 my-5" style={styles.formCSS}>
        <Row className="d-flex justify-content-between mb-5">
          <div>
            <div className="h4">
              <AccountCircle
                style={styles.iconsGeneral}
                className="float-left"
              />{" "}
              Driver Information
            </div>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle>
              <MoreVert style={{ fontSize: "1.3rem" }} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link to="/setting/profile-driver">
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
                <Star style={{
                  color: "#ffc107",
                  marginBottom: "6px"
                }} />{" "}
                <span className="font-italic h5">
                  {this.state.rated}
                </span>
              </p>
              <p>
                Driver:{" "}
                <span className="font-italic h5 mb-3">
                  {this.state.fullName}
                </span>
              </p>
              <p>
                Trip Successed:{" "}
                <span className="font-weight-light h6">
                  {this.state.tripSuccessed}{" "}
                </span>
              </p>
            </div>
          </Col>
          <Col md={8}>
            <Form>
              <FormGroup row>
                <Label for="driverAddress" sm={2}>
                  Address
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="address"
                    id="driverAddress"
                    placeholder="with a placeholder"
                    value={this.state.address}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="driverPassport" sm={2}>
                  Passport:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="passportId"
                    id="driverPassport"
                    placeholder="password placeholder"
                    disabled
                    value={this.state.passportId}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="driverMainjob" sm={2}>
                  Job:
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="mainJob"
                    id="driverMainJob"
                    placeholder="password placeholder"
                    disabled
                    value={this.state.mainJob}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="driverCar" sm={2}>
                  Car:
                </Label>
                <Col sm={10}>
                  <button
                    onClick={this.actionToggleModal}
                    className="text-info p-2"
                    datatoggle="tooltip"
                    dataplacement="left"
                    title="Car information"
                  >
                    {this.state.car ? (
                      this.state.car.brand
                    ) : (
                      <Link to="/setting/profile-driver">
                        Up date your car !!
                      </Link>
                    )}
                  </button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {this.state.car ? (
          <CarSectionPopup
            toggleModal={this.state.toggleModal}
            actionToggleModal={this.actionToggleModal}
            carInfo={this.state.car}
          />
        ) : null}
      </div>
    );
    const userWasDriver = (
      <div> {this.state.address ? hadProfile : notHasProfile} </div>
    );
    const userWasNotDriver = <BecomeDriverSection />;
    return <div>{this.state.userType ? userWasDriver : userWasNotDriver}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(DriverSection);
