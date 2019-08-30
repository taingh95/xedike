import React, { Component } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

//icons 
import { Email, Lock } from "@material-ui/icons";





class authLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: ""
    };
  }
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.loginAction(this.state, this.props.history);
  };
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { email, passWord, error } = this.props.errors;
    return (
      <div className="container py-5">
        <Form onSubmit={this.handleOnSubmit}>
          <p className="h1 mx-auto">Đăng Nhập</p>
          <FormGroup>
            <Label for="loginEmail"><Email style={{marginBottom: "1px", marginRight: "3px"}} /> Email</Label>
            <Input
              id="loginEmail"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChange}
              placeholder="Enter email"
            />
            <FormText>Email has type example@mail.com</FormText>
            {email && (
              <span className="text-danger mt-2 ml-2 font-weight-light">
                {email}
              </span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="loginPassword"><Lock style={{marginBottom: "1px", marginRight: "3px"}} />Password</Label>
            <Input
              id="loginPassword"
              type="password"
              name="passWord"
              value={this.state.passWord}
              onChange={this.handleOnChange}
              placeholder="Enter your password"
            />
            <FormText>
              Password have least 6 charracter and max 30 charracter
            </FormText>
            {passWord && (
              <span className="text-danger mt-2 ml-2 font-weight-light">
                {passWord}
              </span>
            )}
            {error && (
              <span className="text-danger mt-2 ml-2 font-weight-light">
                {error}
              </span>
            )}
          </FormGroup>
          <Button block outline color="secondary" type="submit">
            Login
          </Button>
          <Button block color="secondary">
            Cancel
          </Button>
        </Form>
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
    loginAction: (data, history) => {
      dispatch(login(data, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authLogin);
