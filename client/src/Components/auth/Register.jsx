import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import {connect} from "react-redux";
import { register } from "../../actions/auth";
import { Email, Lock, LocalPhone, CalendarToday, PermContactCalendar } from "@material-ui/icons";

class authRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      passWord: "",
      passWord2: "",
      phone: "",
      DOB: ""
    };
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.registerAction(this.state, this.props.history);
  };
  handleOnChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {email, fullName, passWord, passWord2, phone, DOB} = this.props.errors
    return (
      <div className="container py-5" style={{marginTop: 60}} >
        <Form onSubmit={this.handleOnSubmit}>
          <p className="h1 mx-auto">Đăng Ký</p>
          <FormGroup row>
            <Label for="registerEmail" sm={3}>
            <Email style={{marginBottom: "1px", marginRight: "3px"}} />   
              Email
            </Label>
            <Col sm={9}>
              <Input
                id="registerEmail"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleOnChange}
              />
               {email && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {email}
                </span>
              )} 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="registerFullName" sm={3}>
            <PermContactCalendar style={{marginBottom: "1px", marginRight: "3px"}} />        
              Full Name
            </Label>
            <Col sm={9}>
              <Input
                id="registerFullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={this.state.fullName}
                onChange={this.handleOnChange}
              />
               {fullName && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {fullName}
                </span>
              )} 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="registerPassword" sm={3}>
            <Lock style={{marginBottom: "1px", marginRight: "3px"}} />    
              Password
            </Label>
            <Col sm={9}>
              <Input
                id="registerPassword"
                type="password"
                name="passWord"
                placeholder="Enter your password"
                value={this.state.passWord}
                onChange={this.handleOnChange}
              />
               {passWord && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {passWord}
                </span>
              )} 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmPassword" sm={3}>
            <Lock style={{marginBottom: "1px", marginRight: "3px"}} />       
              Confirm Password
            </Label>
            <Col sm={9}>
              <Input
                id="confirmPassword"
                type="password"
                name="passWord2"
                placeholder="Confirm your password"
                value={this.state.passWord2}
                onChange={this.handleOnChange}
              />
              {passWord2 && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {passWord2}
                </span>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="registerPhone" sm={3}>
            <LocalPhone style={{marginBottom: "1px", marginRight: "3px"}} />       
              Phone Number
            </Label>
            <Col sm={9}>
              <Input
                id="registerPhone"
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={this.state.phone}
                onChange={this.handleOnChange}
              />
               {phone && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {phone}
                </span>
              )} 
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="DOB" sm={3}>
            <CalendarToday style={{marginBottom: "1px", marginRight: "3px"}} />           
              Your birthday
            </Label>
            <Col sm={9}>
              <Input
                id="DOB"
                type="date"
                name="DOB"
                 value={this.state.DOB}
                 onChange={this.handleOnChange}
              />
               {DOB && (
                <span className="text-danger mt-2 ml-2 font-weight-light">
                  {DOB}
                </span>
              )} 
            </Col>
          </FormGroup>
          <FormGroup>
            <Button type="submit" block outline color="secondary">
              Đăng Ký
            </Button>
            <Button block  color="secondary">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerAction: (data,history) => dispatch(register(data,history))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(authRegister);
