import React, { Component, Fragment } from "react";
import PasswordForm from "./pass-word-form"
import moment from "moment";
import {
  Card,
  Button,
  CardTitle,
  CardImg,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { Email, LocalPhone, CalendarToday, PermContactCalendar, AccountCircle } from "@material-ui/icons";
import swal from 'sweetalert'
import { connect } from "react-redux";
import axios from "axios";
import {updateUserProfile} from '../../../actions/user-profile';

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
    backgroundColor: "#fff"
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullName: "",
      phone: "",
      DOB: "",
      avatar: "",
      file: null
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnUploadAvatar = e => {
    this.setState(
      {
        file: e.target.files && e.target.files[0]
      },
      () => {
        const formData = new FormData();
        formData.append("avatar", this.state.file);
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        axios
          .post(
            "http://localhost:8080/api/users/upload-avatar",
            formData,
            config
          )
          .then(res => {
            this.setState({
              avatar: res.data.avatar
            });
            swal("Success!!", "Your avatar was updated!", "success");
          })
          .catch(err => swal("Failed", "Something was wrong", "warning"));
      }
    );
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      fullName: this.state.fullName,
      phone: this.state.phone,
      DOB: this.state.DOB,
    };
    this.props.actionUpdateUserProfile(user)
  };
  componentDidMount() {
    const formatedDOB = moment(this.props.auth.user.DOB, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    this.setState({
      email: this.props.auth.user.email,
      fullName: this.props.auth.user.fullName,
      phone: this.props.auth.user.phone,
      DOB: formatedDOB,
      avatar: this.props.auth.user.avatar,
    });
  }
  render() {
    return (
      <Fragment>
          <div className="container shadow-sm rounded px-5 py-4 my-5" style={styles.formCSS}>
        <Row>
          <AccountCircle style={styles.iconsGeneral} />
          <h1 className="h4">General Profile</h1>
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
                <CardTitle style={{ color: "#333" }}>Avatar </CardTitle>
                {this.state.avatar ? (
                  <CardImg
                    width="300px"
                    height="300px"
                    src={`http://localhost:8080/${this.state.avatar}`}
                    alt="Card image cap"
                  />
                ) : (
                  <AccountCircle style={styles.avatarDefault} />
                )}
                <Form encType="multipart/form-data">
                  <Input
                    type="file"
                    name="file"
                    onChange={this.handleOnUploadAvatar}
                    file={this.state.file}
                  />
                  <FormText color="muted">
                    An avatar is the graphical representation of the user or the
                    user's alter ego or character
                  </FormText>
                </Form>
              </Card>
            </div>
          </Col>
          <Col md={8}>
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup >
                <Label for="passengerEmail">
                <Email style={{marginBottom: "1px", marginRight: "3px"}} />     
                Email: </Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.handleOnChange}
                  value={this.state.email}
                  id="passengerEmail"
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="passengerFullName">
                <PermContactCalendar style={{marginBottom: "1px", marginRight: "3px"}} />    
                Full Name: </Label>
                <Input
                  type="text"
                  name="fullName"
                  onChange={this.handleOnChange}
                  value={this.state.fullName}
                  id="passengerFullName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="passengerPhone">
                <LocalPhone style={{marginBottom: "1px", marginRight: "3px"}} />    
                Phone Number: </Label>
                <Input
                  type="text"
                  name="phone"
                  onChange={this.handleOnChange}
                  value={this.state.phone}
                  id="passengerPhone"
                />
              </FormGroup>
              <FormGroup>
                <Label for="passengerPhone">
                <CalendarToday style={{marginBottom: "1px", marginRight: "3px"}} />    
                Day Of Birth: </Label>
                <Input
                  type="date"
                  name="DOB"
                  onChange={this.handleOnChange}
                  value={this.state.DOB}
                  id="passengerDOB"
                />
              </FormGroup>
              <Button outline type="submit" className="px-5 mr-2">
                Save
              </Button>
              <Button type="reset" className="px-5 ml-2">
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      <PasswordForm />
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
        actionUpdateUserProfile : data => dispatch(updateUserProfile(data))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
