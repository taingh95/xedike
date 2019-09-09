import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Badge
} from "reactstrap";
import axios from "axios";
import moment from "moment";

class CurrentTripModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: "",
      locationFrom: "",
      locationTo: "",
      fee: "",
      availableSeats: "",
      startTime: "",
      isHaveTrip: Boolean
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tripDriver !== this.props.tripDriver) {
      this.setState(
        {
          tripId: this.props.tripDriver
        },
        () => {
          return axios
            .get(`http://localhost:8080/api/trips/${this.state.tripId}`)
            .then(res => {
              const formatedDate = moment(
                res.data.startTime,
                "YYYY-MM-DD"
              ).format("YYYY-MM-DD");
              this.setState({
                isHaveTrip: true,
                locationFrom: res.data.locationFrom,
                locationTo: res.data.locationTo,
                fee: res.data.fee,
                availableSeats: res.data.availableSeats,
                startTime: formatedDate
              });
            })
            .catch(err => {
              this.setState({
                isHaveTrip: false
              });
            });
        }
      );
    }
  }

  render() {
    const {
      locationFrom,
      locationTo,
      fee,
      availableSeats,
      startTime,
      isHaveTrip
    } = this.state;

    const modalBodyHadTrip = (
      <ModalBody>
          <span>User type: </span> 
        <Badge color="success" className="ml-2 mb-2">
          Driver
        </Badge>
        <Table responsive>
          <thead>
            <tr>
              <th>Location From</th>
              <th>Location To</th>
              <th>Available Seats</th>
              <th>Start Time</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{locationFrom}</td>
              <td>{locationTo}</td>
              <td>{availableSeats}</td>
              <td>{startTime}</td>
              <td>{fee} $</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    );

    const modalBodyHadNotTrip = (
      <ModalBody>
        <div className="h4">You are not in the trip. Go get trip now!!</div>
      </ModalBody>
    );

    const modalFooterHadTrip = (
      <ModalFooter>
        <Button color="danger">Cancel Trip</Button>{" "}
        <Button color="primary">Finish</Button>{" "}
        <Button color="secondary" onClick={this.props.handleOnToggleModal}>
          Close
        </Button>
      </ModalFooter>
    );

    const modalFooterNotHadTrip = (
      <ModalFooter>
        <Button color="secondary" onClick={this.props.handleOnToggleModal}>
          Close
        </Button>
      </ModalFooter>
    );

    return (
      <Modal
        isOpen={this.props.toggleModal}
        modalTransition={{ timeout: 300 }}
        backdropTransition={{ timeout: 500 }}
        toggle={this.toggle}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Your Current Trip</ModalHeader>
        {isHaveTrip ? modalBodyHadTrip : modalBodyHadNotTrip}
        {isHaveTrip ? modalFooterHadTrip : modalFooterNotHadTrip}
      </Modal>
    );
  }
}

export default CurrentTripModal;
