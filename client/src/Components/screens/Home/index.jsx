import React, { Component } from "react";
import {
  Row,
} from "reactstrap";
import Trips from "../Trips";
import BecomeDriverSection from "../../layouts/Become-Driver-Section";
import { DirectionsCar } from "@material-ui/icons";
import FilterForm from '../../layouts/filter-form'


const styles = {
  introduce: {
    minHeight: "80vh",
    paddingTop: "5rem",
    marginTop: 70
  },
  currentTripsAlive: {
    minHeight: "500px"
  }
};

class Home extends Component {


  render() {
    return (
      <div>
        <div className="introduction" style={styles.introduce}>
          <div className="container">
            <div className="row">
              <div className="introduction-text col-md-6">
                <p
                  className="col-md text-warning text-left"
                  style={{
                    fontSize: "2rem",
                    textShadow: "0.2px 0.2px 4px #00000023",
                    userSelect: "none"
                  }}
                >
                  The Bright Future of Car Sharing
                </p>
                <p
                  className="col-md text-warning text-left"
                  style={{
                    fontSize: "1.2rem",
                    textShadow: "0.2px 0.2px 4px #00000023",
                    userSelect: "none"
                  }}
                >
                  A car used to be the ultimate symbol of freedom and
                  independence but increasingly consumers view ownership as an
                  expense and a burden. Often considered the gateway to other
                  forms of Collaborative Consumption, Car Sharing is becoming
                  increasingly popular with its promise of personal convenience
                  and social improvement.
                </p>
              </div>
              <div className="col-md-6">
                  <div className="car-body">
                    <img
                      src={`http://localhost:8080/uploads/car/car.png`}
                      alt=""
                    />
                  </div>
                  <div className="wheel">
                    <img
                      src={`http://localhost:8080/uploads/car/wheel.png`}
                      alt=""
                      className="backwheel"
                    />
                    <img
                      src={`http://localhost:8080/uploads/car/wheel.png`}
                      alt=""
                      className="frontwheel"
                    />
                  </div>
              </div>
            </div>
            <div className="row mt-5">
              <FilterForm />
            </div>
          </div>
        </div>
        <div
          className="currentTripsAlive container mt-2 mb-2"
          style={styles.currentTripsAlive}
        >
          <Row>
            <DirectionsCar
              style={{
                fontSize: "2rem",
                margin: "0.6rem .5rem",
                color: "green"
              }}
            />
            <p style={{ fontSize: "2rem" }}>Current Trips</p>
          </Row>

          <Trips />
        </div>
        <BecomeDriverSection />
      </div>
    );
  }
}
export default Home;
