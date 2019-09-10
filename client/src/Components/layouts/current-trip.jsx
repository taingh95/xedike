import React, { Component, Fragment } from "react";
import { DirectionsCar } from "@material-ui/icons";
import CurrentTripModal from "./current-trip-modal";
import { connect } from "react-redux";
import axios from "axios";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      currentTrip: [],
      position: "",
      tripId: ""
    };
  }



  //click modal
  handleOnClick = e => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  };

  componentDidMount() {
    if(this.props.auth.user.currentTrip.length > 0) {
      axios.get(`http://localhost:8080/api/trips/${this.props.auth.user.currentTrip[0].tripId}`)
          .then(res => {
            this.setState({
              currentTrip: res.data,
              position: this.props.auth.user.currentTrip[0].position,
              tripId: this.props.auth.user.currentTrip[0].tripId
            })
          })
          .catch(err => console.log(err))
    } 
    
  }

  render() {
    return (
      <Fragment>
        <div className="current-tripp" onClick={this.handleOnClick}>
          <DirectionsCar className="current-tripp-icon" />
          <div className="h6 current-tripp-text"> Your current trips!!</div>
        </div>
        <CurrentTripModal
          toggleModal={this.state.toggleModal}
          handleOnToggleModal={this.handleOnClick}
          currentTrip={this.state.currentTrip}
          position={this.state.position}
          tripId={this.state.tripId}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(CurrentTrip);
