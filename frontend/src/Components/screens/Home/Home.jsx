import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import TripLists from "./TripLists";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      locationFrom: "",
      locationTo: "",
      numberOfBookingSeats: 0
    };
  }
  handleOnChange(e) {
    this.setState({
      startDate: e.target.startTime
    });
  }
  render() {
    const styles = {
      intro: {
        color: "#fff",
        width: "50%",
        textAlign: "center",
        textShadow: "0px 0px 4px rgb(160, 160, 160)",
        userSelect: "none"
      },
      content: {
        width: "100%",
        height: "90vh",
        backgroundImage: "url('./images/02_hero_banner.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }
    };
    return (
      <Fragment>
        <div className="content" style={styles.content}>
          <div className="intro" style={styles.intro}>
            <h1>Bắt đầu chuyến đi của bạn</h1>
            <h2>Đã có 1152 thành viên sử dụng chuyến đi trên toàn quốc</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <Form inline className="mt-5">
            <FormGroup className="mx-1">
              <Input
                style={{ padding: "2em", height: "2.6rem", width: "10rem" }}
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option>Nơi Đi</option>
                <option>Nha Trang</option>
                <option>Đà Lạt</option>
                <option>Sài Gòn</option>
                <option>Vũng Tàu</option>
              </Input>
            </FormGroup>
            <FormGroup className="mx-1">
              <Input
                style={{ height: "2.6rem", width: "10rem" }}
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option>Nơi Đến</option>
                <option>Nha Trang</option>
                <option>Đà Lạt</option>
                <option>Sài Gòn</option>
                <option>Vũng Tàu</option>
              </Input>
            </FormGroup>
            <FormGroup className="mx-1">
              <Input
                style={{ height: "2.6rem", width: "12rem" }}
                placeholder="Chọn giờ bắt đầu"
                type="date"
                name="startTime"
                id="startDate"
              />
            </FormGroup>
            <FormGroup className="mx-1">
              <Input
                style={{ height: "2.6rem", width: "10rem" }}
                type="number"
                name="number"
                id="exampleNumber"
                placeholder="Đặt chỗ"
              />
            </FormGroup>
            <Button className=" btn btn-success py-2 px-5 ml-1">Tìm Kiếm</Button>
          </Form>
        </div>
        <div className="trip-list overflow-auto" style={{minHeight: "500px"}}>
          <TripLists />
        </div>
      </Fragment>
    );
  }
}
