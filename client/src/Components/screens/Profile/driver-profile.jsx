import React, { Component, Fragment } from "react";
import {createDriverProfile, updateDriverProfile} from "../../../actions/driver-profile"
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  Email,
  LocalPhone,
  PermContactCalendar,
  AccountCircle
} from "@material-ui/icons";
import swal from "sweetalert";
import { connect } from "react-redux";
import axios from "axios";
import CarProfile from "./car-profile";

const styles = {
  iconsGeneral: {
    fontSize: "2rem",
    marginRight: "1rem"
  },
  avatarDefault: {
    color: "#333",
    fontSize: "15rem"
  },
  formCSS: {
    backgroundColor: "#fff",
    marginTop: 100
  }
};

class DriverProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      passportId: "",
      mainJob: "",
      car: [],
      isActive: false,
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      address: this.state.address,
      passportId: this.state.passportId,
      mainJob: this.state.mainJob,
    };
    if(this.state.isActive) {
        this.props.actionUpdateDriver(user)
    } else {
        this.props.actionCreateProfile({...user, userId : this.props.auth.user._id});
    } 
  };
  handleOnCancel = e => {
    e.preventDefault();
    swal('Your upgraded will be discharge?', {
      title: "Are you sure?",
      buttons: true,
      icon: "warning"
    }).then(confirmLogin => {
      (confirmLogin) ? this.props.history.goBack() : swal.close()
    }).catch(err => console.log(err))
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/api/drivers/${this.props.auth.user._id}`).then(res => {
        this.setState({
            address: res.data.address,
            passportId: res.data.passportId,
            mainJob: res.data.mainJob,
            isActive: res.data.isActive,
            car: res.data.carInfo[0]
        })
    })  
  }
  render() {
    return (
      <Fragment>
        <div
          className="container shadow-sm rounded px-5 py-4"
          style={styles.formCSS}
        >
          <Row>
            <AccountCircle style={styles.iconsGeneral} />
            <h1 className="h4">Driver Profile</h1>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <Form onSubmit={this.handleOnSubmit}>
                <FormGroup className="d-flex">
                  <Label for="driverAddress" md={4}>
                    <Email
                      style={{ marginBottom: "1px", marginRight: "3px" }}
                    />
                    Address:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="address"
                    onChange={this.handleOnChange}
                    value={this.state.address}
                    id="driverAddress"
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label for="passport" md={4}>
                    <PermContactCalendar
                      style={{ marginBottom: "1px", marginRight: "3px" }}
                    />
                    Passport:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="passportId"
                    onChange={this.handleOnChange}
                    value={this.state.passportId}
                    id="passport"
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label for="mainJob" md={4}>
                    <LocalPhone
                      style={{ marginBottom: "1px", marginRight: "3px" }}
                    />
                    Main Job:{" "}
                  </Label>
                  <Input
                  md={8}
                    type="text"
                    name="mainJob"
                    onChange={this.handleOnChange}
                    value={this.state.mainJob}
                    id="mainJob"
                  />
                </FormGroup>
                <Button outline type="submit" className="px-5 mr-2">
                  Save
                </Button>
                <Button type="reset" className="px-5 ml-2"
                    onClick={this.handleOnCancel}
                >
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
        <CarProfile history={this.props.history} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionCreateProfile: data => dispatch(createDriverProfile(data)),
    actionUpdateDriver: data => dispatch(updateDriverProfile(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverProfile);
