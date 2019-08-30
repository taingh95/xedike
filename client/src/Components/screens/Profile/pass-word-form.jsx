import React, { Component } from "react";
import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Lock } from "@material-ui/icons";
import { connect } from "react-redux";
import { changePassword } from "../../../actions/user-profile";

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

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.actionChangePassword(this.state);
    this.setState({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  };

  render() {
    return (
      <div className="container shadow-sm rounded px-5 py-4 my-5" style={styles.formCSS}>
        <Row>
          <Lock style={styles.iconsGeneral} />
          <h1 className="h4">Password</h1>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <Label for="currentPassword">
                  Current Password:{" "}
                  {this.props.errors.error && (
                    <span className="text-danger mt-2 ml-2 font-weight-light">
                      {this.props.errors.error}
                    </span>
                  )}
                </Label>
                <Input
                  type="password"
                  name="currentPassword"
                  onChange={this.handleOnChange}
                  value={this.state.currentPassword}
                  id="currentPassword"
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">New Password: </Label>
                <Input
                  type="password"
                  name="newPassword"
                  onChange={this.handleOnChange}
                  value={this.state.newPassword}
                  id="newPassword"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmNewPassword">Confirm New Password: </Label>
                <Input
                  type="password"
                  name="confirmNewPassword"
                  onChange={this.handleOnChange}
                  value={this.state.confirmNewPassword}
                  id="confirmNewPassword"
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
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionChangePassword: data => dispatch(changePassword(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordForm);
