import React, { useState } from "react";
import Axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col
} from "reactstrap";

export default function Register() {
    const initialState = {
        email: "",
        fullName: "",
        passWord: "",
        passWord2: "",
        phone: "",
        DOB: ""
      };
    const [user, setUser] = useState(initialState);
    const handleOnSubmit = (event) => {
        event.preventDefault();
        Axios.post("localhost:8080/api/users/register", user)
              .then(res => console.log(res, "res"))
              .catch(err => console.log(err));
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
            />
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
            />
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
            />
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
              placeholder="Enter your password"
            />
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
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="DOB" sm={3}>
            Your birthday
          </Label>
          <Col sm={9}>
            <Input id="DOB" type="date" name="DOB"  />
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
