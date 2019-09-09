import React, { Component, Fragment } from "react";
import { DirectionsCar } from "@material-ui/icons";
import CurrentTripModal from "./current-trip-modal";
import { connect } from "react-redux";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      currentTrip: 0
    };
  }



  //click modal
  handleOnClick = e => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  };

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
          tripDriver={this.props.driverInfo.driver.currentTrip}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    driverInfo: state.driver,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(CurrentTrip);
