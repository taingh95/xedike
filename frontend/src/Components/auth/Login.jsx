import React, { Component } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class Login extends Component {
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
    const { email, passWord } = this.props.errors;
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          backgroundImage: "url('./images/02_hero_banner.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <Form
          className="border border-success rounded p-5"
          style={{ width: "500px", backgroundColor: "rgba(255,255,255,.8)" }}
        >
          <p className="h1 mx-auto">Đăng Nhập</p>
          <FormGroup>
            <Label for="loginEmail">Email</Label>
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
            <Label for="loginPassword">Password</Label>
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
          </FormGroup>
          <Button block color="success" type="submit">
            Login
          </Button>
          <Button block outline color="secondary">
            Cancel
          </Button>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return { errors: state.errors };
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
)(Login);
