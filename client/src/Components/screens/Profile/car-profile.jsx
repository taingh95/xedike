import React, { Component, Fragment } from "react";
import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { DirectionsCar, Collections } from "@material-ui/icons";
// import swal from "sweetalert";
import { connect } from "react-redux";
import axios from "axios";
import swal from 'sweetalert'


const styles = {
  iconsGeneral: {
    fontSize: "2rem",
    marginRight: "1rem"
  },
  avatarDefault: {
    color: "#333",
    fontSize: "15rem"
  },
  formCSS: {
    backgroundColor: "#fff"
  }
};

class CarProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: "",
      model: "",
      lisencePlate: "",
      numberOfSeats: "",
      carImages: [],
      file: null,
      isActive: false
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      file: e.target.files
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
  };

  handleOnCancel = e => {
    e.preventDefault();
    swal('Your upgraded will be discharge?', {
      title: "Are you sure?",
      buttons: true,
      icon: "warning"
    }).then(confirmLogin => {
      (confirmLogin) ? this.props.history.goBack() : swal.close()
    }).catch(err => console.log(err))
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/drivers/${this.props.auth.user._id}`)
      .then(res => {
        const {
          brand,
          model,
          lisencePlate,
          numberOfSeats,
          carImages
        } = res.data.carInfo[0];
        this.setState({
          brand,
          model,
          lisencePlate,
          numberOfSeats,
          carImages
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const imgCar = this.state.carImages.map((picture, i) => {
      return (
        <img
          key={i}
          className="p-2"
          src={`http://localhost:8080/${picture}`}
          alt=""
          style={{ width: 150 }}
        />
      );
    });
    return (
      <Fragment>
        <div
          className="container shadow-sm rounded px-5 py-4 my-5"
          style={styles.formCSS}
        >
          <Row>
            <DirectionsCar style={styles.iconsGeneral} />
            <h1 className="h4">Car Profile</h1>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <Form
                onSubmit={this.handleOnSubmit}
                encType="multipart/form-data"
              >
                <FormGroup className="d-flex">
                  <Label for="carBrand" md={4}>
                    Brand:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="brand"
                    value={this.state.brand}
                    onChange={this.handleOnChange}
                    id="carBrand"
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label for="carModel" md={4}>
                    Model:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="model"
                    value={this.state.model}
                    id="carModel"
                    onChange={this.handleOnChange}
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label for="lisencePlate" md={4}>
                    Lisence Plate:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="lisencePlate"
                    value={this.state.lisencePlate}
                    id="lisencePlate"
                    onChange={this.handleOnChange}
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label for="numberOfSeats" md={4}>
                    Number Of Seats:{" "}
                  </Label>
                  <Input
                    md={8}
                    type="text"
                    name="numberOfSeats"
                    value={this.state.numberOfSeats}
                    id="numberOfSeats"
                    onChange={this.handleOnChange}
                  />
                </FormGroup>
                <FormGroup className="d-flex">
                  <Label md={4}>
                    <Collections
                      style={{ marginBottom: "1px", marginRight: "3px" }}
                    />
                    Car Images:
                  </Label>
                  <div className="car-image col-md-8">
                    <div className="img mb-3">{imgCar}</div>
                    <Input
                      type="file"
                      name="file"
                      onChange={this.handleOnChange}
                      file={this.state.file}
                      multiple
                    />
                  </div>
                </FormGroup>
                <Button outline type="submit" className="px-5 mr-2">
                  Save
                </Button>
                <Button type="reset" className="px-5 ml-2"
                    onClick={this.handleOnCancel}
                >
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
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
)(CarProfile);
