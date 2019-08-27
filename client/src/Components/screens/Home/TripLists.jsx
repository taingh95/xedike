import React, { Component } from "react";
import { Table } from "reactstrap";
import TripListRow from "./TripListRow";
import Axios from "axios";
class TripLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:8080/api/trips")
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="container mt-3">
        <div className="d-flex">
          <img
            style={{ width: "25px", paddingBottom: "5px" }}
            src="./car.svg"
            alt=""
          />
          <p className="h3 ml-2">Các chuyến đi hiện tại</p>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>Tên Tài Xế</th>
              <th>Nơi Đi</th>
              <th>Nơi Đến</th>
              <th>Chỗ Còn Trống</th>
              <th>Ngày xuất phát</th>
              <th>Giá tiền / Người</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((trip, i) => {
              return <TripListRow trip={trip} key={i} />;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TripLists;
