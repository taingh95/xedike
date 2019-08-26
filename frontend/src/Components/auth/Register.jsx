import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { useSelector} from 'react-redux'


export default function Register(props) {
  const initialState = {
    email: "",
    fullName: "",
    passWord: "",
    passWord2: "",
    phone: "",
    DOB: ""
  };
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const handleOnSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/users/register", user)
      .then(res => {
        console.log(res);
        setErrors({});
        setUser(initialState)
        props.history.push("/login")
      })
      .catch(err => setErrors(err.response.data.errors));
  };
  const handleOnChange = event => {
    event.preventDefault();
    setUser({...user, [event.target.name] : event.target.value})
  }
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
        onSubmit={handleOnSubmit}
        className="border border-success rounded p-5 col-md-8"
        style={{ backgroundColor: "rgba(255,255,255,.8)" }}
      >
        <p className="h1 mx-auto">Đăng Ký</p>
        <FormGroup row>
          <Label for="registerEmail" sm={3}>
            Email
          </Label>
          <Col sm={9}>
            <Input
              id="registerEmail"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleOnChange}
            />
            { errors.email &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.email}</span>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="registerFullName" sm={3}>
            Full Name
          </Label>
          <Col sm={9}>
            <Input
              id="registerFullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={user.fullName}
              onChange={handleOnChange}
            />
            { errors.fullName &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.fullName}</span>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="registerPassword" sm={3}>
            Password
          </Label>
          <Col sm={9}>
            <Input
              id="registerPassword"
              type="password"
              name="passWord"
              placeholder="Enter your password"
              value={user.passWord}
              onChange={handleOnChange}
            />
            { errors.passWord &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.passWord}</span>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="confirmPassword" sm={3}>
            Confirm Password
          </Label>
          <Col sm={9}>
            <Input
              id="confirmPassword"
              type="password"
              name="passWord2"
              placeholder="Confirm your password"
              value={user.passWord2}
              onChange={handleOnChange}
            />
            { errors.passWord2 &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.passWord2}</span>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="registerPhone" sm={3}>
            Phone Number
          </Label>
          <Col sm={9}>
            <Input
              id="registerPhone"
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={user.phone}
              onChange={handleOnChange}
            />
            { errors.phone &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.phone}</span>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="DOB" sm={3}>
            Your birthday
          </Label>
          <Col sm={9}>
            <Input id="DOB" type="date" name="DOB" value={user.DOB} onChange={handleOnChange}/>
            { errors.DOB &&  <span className="text-danger mt-2 ml-2 font-weight-light">{errors.DOB}</span>}
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Button type="submit" block color="success">
            Đăng Ký
          </Button>
          <Button block outline color="secondary">
            Cancel
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}
