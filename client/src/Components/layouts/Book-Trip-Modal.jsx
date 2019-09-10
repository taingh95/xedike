import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Badge,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { connect } from "react-redux";
import { bookTrip } from "../../actions/trips";

class BookTripModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBookingSeats: "",
      modal: false
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.actionBookTrip(
      this.props.tripId,
      { numberOfBookingSeats: this.state.numberOfBookingSeats },
      this.props.handleOnToggleModal
    );
  };
  render() {
    const {
      locationFrom,
      locationTo,
      fee,
      formatedDate,
      availableSeats
    } = this.props.tripInformation;
    return (
      <Modal
        size="lg"
        isOpen={this.props.toggleModal}
        modalTransition={{ timeout: 300 }}
        backdropTransition={{ timeout: 300 }}
        toggle={this.toggle}
      >
        <ModalHeader>
          <span>Booking trip</span>
        </ModalHeader>
        <ModalBody>
          <Badge color="info" className="ml-2 mb-2">
            Trip Information
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
                <td>{formatedDate}</td>
                <td>{fee} $</td>
              </tr>
            </tbody>
          </Table>
          <Badge color="primary" className="ml-2 mb-2">
            BookTrip Information
          </Badge>
          <Form onSubmit={this.handleOnSubmit} id="formBooking">
            <FormGroup>
              <Label for="numberOfBookSeats">Number Of Booking Seats</Label>
              <Input
                type="select"
                name="numberOfBookingSeats"
                id="numberOfBookSeats"
                onChange={this.handleOnChange}
                // invalid={availableSeats ? true : false}
              >
                <option>Choose your seats</option>
                <option value={1}>1 Seat</option>
                <option value={2}>2 Seats</option>
                <option value={3}>3 Seats</option>
                <option value={4}>4 Seats</option>
                <option value={5}>5 Seats</option>
              </Input>
              <FormText>
                Your booking does not greater than available seat.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" form="formBooking">
            Book Trip
          </Button>{" "}
          <Button color="secondary" onClick={this.props.handleOnToggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionBookTrip: (tripId, data, cb) => dispatch(bookTrip(tripId, data, cb))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BookTripModal);
