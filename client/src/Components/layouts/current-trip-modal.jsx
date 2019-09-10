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
import moment from "moment";
import swal from "sweetalert";
import {connect} from 'react-redux'

import {deleteTrip, finishTrip, cancelTrip} from '../../actions/trips'

class CurrentTripModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: {
        locationFrom: "",
        locationTo: "",
        fee: "",
        availableSeats: "",
        startTime: ""
      },
      isHaveTrip: false,
      position: ""
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentTrip !== this.props.currentTrip) {
      this.setState({
        currentTrip: this.props.currentTrip,
        position: this.props.position,
        isHaveTrip: true
      })
    }
  }

  driverActionCancelTrip = () => {
    swal('Delete this trip', {
      title: "Are you sure?",
      buttons: true,
      icon: "warning"
    }).then(confirm => {
      (confirm) ? this.props.actionDriverDeleteTrip(this.props.tripId, this.props.handleOnToggleModal) : swal.close()
    }).catch(err => console.log(err))
  }

  driverActionFinishTrip = () => {
    swal('Finish your trip', {
      title: "Are you sure?",
      buttons: true,
      icon: "warning"
    }).then(confirm => {
      (confirm) ? this.props.actionDriverFinishTrip(this.props.tripId, this.props.handleOnToggleModal) : swal.close()
    }).catch(err => console.log(err))
  }

  passengerActionCancelTrip = () => {
    swal('Cancel your trip', {
      title: "Are you sure?",
      buttons: true,
      icon: "warning"
    }).then(confirm => {
      (confirm) ? this.props.actionPassCancelTrip(this.props.tripId, this.props.handleOnToggleModal) : swal.close()
    }).catch(err => console.log(err))
  }


  render() {
    const {
      currentTrip,
      isHaveTrip,
      position
    } = this.state;
    const formatStartTime = moment(currentTrip.startTime, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    const modalBodyHadTrip = (
      <ModalBody>
        <span>User type: </span>
        <Badge color="success" className="ml-2 mb-2">
          {position}
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
              <td>{currentTrip.locationFrom}</td>
              <td>{currentTrip.locationTo}</td>
              <td>{currentTrip.availableSeats}</td>
              <td>{formatStartTime}</td>
              <td>{currentTrip.fee} $</td>
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

    const modalFooterDriver = (
      <ModalFooter>
        <Button 
        color="danger"
        onClick={this.driverActionCancelTrip}
        >Delete Trip</Button>{" "}
        <Button 
        color="primary"
        onClick={this.driverActionFinishTrip}
        >
        Finish
        </Button>{" "}
        <Button color="secondary" onClick={this.props.handleOnToggleModal}>
          Close
        </Button>
      </ModalFooter>
    );
    const modalFooterPass = (
      <ModalFooter>
        <Button 
        color="danger"
        onClick={this.passengerActionCancelTrip}
        >Cancel Trip</Button>{" "}
        <Button color="secondary" onClick={this.props.handleOnToggleModal}>
          Close
        </Button>
      </ModalFooter>
    )  


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
        {!isHaveTrip ? modalFooterNotHadTrip : (position == "driver") ? modalFooterDriver : modalFooterPass}
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionDriverDeleteTrip: (tripId, cb) => dispatch(deleteTrip(tripId, cb)),
    actionDriverFinishTrip: (tripId, cb) => dispatch(finishTrip(tripId, cb)),
    actionPassCancelTrip: (tripId, cb) => dispatch(cancelTrip(tripId, cb))
  }
}

export default connect(null,mapDispatchToProps)(CurrentTripModal);
