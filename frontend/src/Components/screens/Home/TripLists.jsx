import React, { Component } from "react";
import { Table } from "reactstrap";
import TripListRow from "./TripListRow";
import Axios from "axios";
class TripLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          locationFrom: "Hà Nội",
          locationTo: "Huế",
          availableSeats: 4,
          fee: 50000,
          startTime: "23/8/2019",
          driverName: "Nguyễn Tấn"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Nha Trang",
          availableSeats: 2,
          fee: 10000,
          startTime: "11/8/2019",
          driverName: "Nguyễn Gà"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        },
        {
          locationFrom: "Sài Gòn",
          locationTo: "Vũng Tàu",
          availableSeats: 6,
          fee: 80000,
          startTime: "29/8/2019",
          driverName: "Nguyễn Oanh"
        }
      ]
    };
  }
  componentDidMount() {
    Axios.get("localhost:8080/api/trips")
      .then(res => console.log(res))
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
