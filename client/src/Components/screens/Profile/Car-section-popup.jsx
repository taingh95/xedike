import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CarSectionPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  render() {
    const {
      brand,
      model,
      numberOfSeats,
      carImages,
      lisencePlate
    } = this.props.carInfo;
    return (
      <Modal isOpen={this.props.toggleModal}>
        <ModalHeader
          toggle={this.toggle}
        >
            Car information
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <p>Car's brand:</p> <p className="h4">{brand }</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Car's model:</p> <p className="h4">{model}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Car's lisence plate:</p> <p className="h4">{lisencePlate}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Car's numberOfSeats:</p> <p className="h4">{numberOfSeats}</p>
          </div>
          <div className="d-flex justify-content-between"> Car images:</div>
          <div className="d-flex justify-content-end">
            {carImages.map((image, i) => {
              return (
                <img
                  style={{ width: 150, padding: 5, height: 150 }}
                  src={`http://localhost:8080/${image}` || null}
                  alt=""
                  key={i}
                />
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.actionToggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CarSectionPopup;
