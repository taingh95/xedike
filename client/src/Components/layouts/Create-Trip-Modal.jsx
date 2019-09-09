import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { createTrip } from "../../actions/trips";



class CreateTripModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      locationFrom: "",
      locationTo: "",
      startTime: "",
      availableSeats: "",
      fee: "", 

    };
  }
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value, 
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.actionCreateTrip(this.state, this.props.actionHandleOnClickModal);
  };


  render() {
      const {locationFrom, locationTo, startTime, availableSeats, fee} = this.props.errors
    return (
      <Modal isOpen={this.props.toggleModal}>
        <ModalHeader toggle={this.toggle}>Create Your New Trip!!!!</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleOnSubmit}>
            <FormGroup>
              <Label for="createLocationFrom">Location From</Label>
              <Input
                type="select"
                name="locationFrom"
                id="createLocationFrom"
                onChange={this.handleOnChange}
                invalid={locationFrom ? true : false}
              >
                <option>Select Location</option>
                <option value={"Nha Trang"}>Nha Trang</option>
                <option value={"Hồ Chí Minh"}>Hồ Chí Minh</option>
                <option value={"Vũng Tàu"}>Vũng Tàu</option>
                <option value={"Cần Thơ"}>Cần Thơ</option>
                <option value={"Cà Mau"}>Cà Mau</option>
              </Input>
              <FormFeedback>{locationFrom}</FormFeedback>  
            </FormGroup>
            <FormGroup>
              <Label for="createLocationTo">Location To</Label>
              <Input
                type="select"
                name="locationTo"
                id="createLocationTo"
                onChange={this.handleOnChange}
                invalid={locationTo ? true : false}
              >
                <option>Select Location</option>
                <option value={"Nha Trang"}>Nha Trang</option>
                <option value={"Hồ Chí Minh"}>Hồ Chí Minh</option>
                <option value={"Vũng Tàu"}>Vũng Tàu</option>
                <option value={"Cần Thơ"}>Cần Thơ</option>
                <option value={"Cà Mau"}>Cà Mau</option>
              </Input>
              <FormFeedback>{locationTo}</FormFeedback>  
            </FormGroup>
            <FormGroup>
              <Label for="createStartTime">Date</Label>
              <Input
                type="date"
                name="startTime"
                id="createStartTime"
                placeholder="date placeholder"
                onChange={this.handleOnChange}
                invalid={startTime ? true : false}
              />
              <FormFeedback>{startTime}</FormFeedback>  
            </FormGroup>
            <FormGroup>
              <Label for="createAvailableSeats">Available Seats</Label>
              <Input
                type="select"
                name="availableSeats"
                id="createAvailableSeats"
                onChange={this.handleOnChange}
                invalid={availableSeats ? true : false}
              >
                <option>Choose your seats</option>  
                <option value={1}>1 Seat</option>
                <option value={2}>2 Seats</option>
                <option value={3}>3 Seats</option>
                <option value={4}>4 Seats</option>
                <option value={5}>5 Seats</option>
              </Input>
              <FormFeedback>{availableSeats}</FormFeedback> 
            </FormGroup>
            <FormGroup>
              <FormText color="muted">
                This is some placeholder block-level help text for the above
                input. It's a bit lighter and easily wraps to a new line.
              </FormText>
              <Label>Fee/Passenger: {this.state.fee} vnd</Label>
              <Input
                type="number"
                name="fee"
                id="createStartTime"
                placeholder="Enter fee per passenger"
                onChange={this.handleOnChange}
                invalid={fee ? true : false}
              />
              <FormFeedback>{fee}</FormFeedback> 
            </FormGroup>
            <Button outline color="secondary" block type="submit">
              Submit
            </Button>
            <Button
              color="secondary"
              block
              onClick={this.props.actionHandleOnClickModal}
            >
              Close
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <FormText>
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
    return {
        errors: state.errorsTrip
    }
}


const mapDispatchToProps = dispatch => {
  return {
    actionCreateTrip: (data,cb) => dispatch(createTrip(data,cb)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripModal);
