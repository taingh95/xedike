import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from "reactstrap";

export default function Login() {
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
        style={{ width: "500px",backgroundColor: "rgba(255,255,255,.8)"}}
      > 
        <p className="h1 mx-auto">Đăng Nhập</p>
        <FormGroup>
          <Label for="loginEmail">Email</Label>
          <Input id="loginEmail" type="email" placeholder="Enter email" />
          <FormText>Email has type example@mail.com</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input id="loginPassword"  type="password" placeholder="Enter your password" />
          <FormText>
            Password have least 6 charracter and max 30 charracter
          </FormText>
        </FormGroup>
        <Button block color="success">
          Login
        </Button>
        <Button block outline color="secondary">
          Cancel
        </Button>
      </Form>
    </div>
  );
}
