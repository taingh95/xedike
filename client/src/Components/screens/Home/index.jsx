import React, { Component } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  CustomInput
} from "reactstrap";
import Trips from "../Trips";
import BecomeDriverSection from '../../layouts/Become-Driver-Section'
import { DirectionsCar, Search } from "@material-ui/icons";

const styles = {
  introduce: {
    backgroundImage: "url(./images/02_hero_banner.jpg)",
    height: "70vh",
    backgroundColor: "rbga(255,255,255,.2)",
    paddingTop: "3rem"
  },
  currentTripsAlive: {
    height: "500px"
  }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationFrom: "",
            locationTo: "",
            startDate: "",
            availableSeats: ""
        }
    }


  render() {
    return (
      <div>
        <div className="introduction" style={styles.introduce}>
          <div className="container">
            <p
              className="col-md text-light text-center"
              style={{
                fontSize: "3rem",
                textShadow: "0.2px 0.2px 4px #00000073",
                userSelect: "none"
              }}
            >
              The Bright Future of Car Sharing
            </p>
            <p
              className="col-md text-light text-left"
              style={{
                fontSize: "1.5rem",
                textShadow: "0.2px 0.2px 4px #00000073",
                userSelect: "none"
              }}
            >
              A car used to be the ultimate symbol of freedom and independence
              but increasingly consumers view ownership as an expense and a
              burden. Often considered the gateway to other forms of
              Collaborative Consumption, Car Sharing is becoming increasingly
              popular with its promise of personal convenience and social
              improvement.
            </p>
            <Form  className="shadow bg-white rounded p-3">
              <Row form>
                <Col className="col-md-3 col-sm-6 col-12">
                  <FormGroup>
                    <Label for="locationFrom">Location From:</Label>
                    <CustomInput
                      type="select"
                      id="locationFrom"
                      name="locationFrom"
                    >
                      <option value="">Location From</option>
                      <option>Nha Trang</option>
                      <option>Hồ Chí Minh</option>
                      <option>Vũng Tàu</option>
                      <option>Cần Thơ</option>
                      <option>Cà Mau</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col className="col-md-3 col-sm-6 col-12">
                  <FormGroup>
                    <Label for="locationTo">Location To:</Label>
                    <CustomInput
                      type="select"
                      id="locationTo"
                      name="locationTo"
                    >
                      <option value="">Location To</option>
                      <option>Nha Trang</option>
                      <option>Hồ Chí Minh</option>
                      <option>Vũng Tàu</option>
                      <option>Cần Thơ</option>
                      <option>Cà Mau</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col className="col-md-3 col-sm-6 col-12">
                  <FormGroup>
                  <Label for="exampleCustomSelect">Start Time:</Label>  
                    <Input
                      type="date"
                      name="start"
                      id="exampleStartTime"
                      placeholder="Start Time"
                    />
                  </FormGroup>
                </Col>
                <Col className="col-md-3 col-sm-6 col-12">
                  <FormGroup>
                    <Label for="exampleCustomSelect">Available Seats:</Label>
                    <CustomInput
                      type="select"
                      id="availableSeats"
                      name="availableSeats"
                    >
                      <option value="">Select Seats</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col>
                  <Button block><Search /> Search</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div
          className="currentTripsAlive container my-2"
          style={styles.currentTripsAlive}
        >
          <Row>
            <DirectionsCar
              style={{ fontSize: "2rem", margin: "0.6rem .5rem", color: "green" }}
            />
            <p style={{ fontSize: "2rem" }}>Current Trips</p>
          </Row>

          <Trips />
          <nav aria-label="Page navigation example" className="float-right">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="d" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="c">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="b">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="a">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="f" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <BecomeDriverSection />
      </div>
    );
  }
}
export default Home;
