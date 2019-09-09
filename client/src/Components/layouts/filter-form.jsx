import React, { Component } from 'react';
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
  import { Search } from "@material-ui/icons";



class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationFrom: "",
            locationTo: "",
            startDate: "",
            availableSeats: ""
          };
    }
    render() {
        return (
            <Form className="shadow-sm bg-white rounded p-3 m-auto">
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
                <Button block>
                  <Search /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        )
    }
}


export default FilterForm;
