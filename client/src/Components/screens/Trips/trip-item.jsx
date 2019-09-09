import React, { Component } from "react";
import {
    CalendarToday,
    DirectionsRun,
    DriveEta,
    EventSeat,
    Star,
    AccountCircle
  } from "@material-ui/icons";
  import moment from "moment";

  import axios from 'axios';

class tripItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverImage: "",
            rated: 0,
            fullName: "",
            car: []
        }
    }

  componentDidMount() {
      axios.get(`http://localhost:8080/api/drivers/find/${this.props.trip.driverId}`)
            .then(res => {
                this.setState({
                    rated: res.data.passengersRates,
                    car: res.data.carInfo[0]
                })
                axios.get(`http://localhost:8080/api/users/${res.data.userId}`)
                       .then(user => {
                           this.setState({
                               driverImage: user.data.avatar,
                               fullName: user.data.fullName
                           })
                       }) 
            })
            .catch(console.log)
  }  

  componentDidUpdate(prevProps) {
      if(this.props.trip.driverId !== prevProps.trip.driverId) {
        axios.get(`http://localhost:8080/api/drivers/find/${this.props.trip.driverId}`)
        .then(res => {
            this.setState({
                rated: res.data.passengersRates,
                car: res.data.carInfo[0]
            })
            axios.get(`http://localhost:8080/api/users/${res.data.userId}`)
                   .then(user => {
                       this.setState({
                           driverImage: user.data.avatar,
                           fullName: user.data.fullName
                       })
                   }) 
        })
        .catch(console.log)
      }
  }


  render() {
    const {locationFrom, locationTo, fee, startTime, availableSeats} = this.props.trip  
    const {driverImage, rated, fullName, car} = this.state
    const formatedDate = moment(startTime, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      );

    return (
      <div className="shadow-sm p-3 mb-3 rounded trips-card">
        <div className="col-md-3">
          <div className="d-flex">
            <DirectionsRun />
            <p className="text-card">
              {locationFrom} -> {locationTo}
            </p>
          </div>
          <div className="d-flex">
            <CalendarToday />
            <p className="text-card">{formatedDate}</p>
          </div>
        </div>
        <div className="col-md-2">
          <div className="d-flex">
            <DriveEta />
            <p className="text-card">{car.brand}</p>
          </div>
          <div className="d-flex">
            <EventSeat />
            <p className="text-card">{availableSeats}</p>
          </div>
        </div>
        <div className="col-md-3">
            {driverImage ? <img
            className="driver-image-show"
            src={`http://localhost:8080/${driverImage}`}
            style={{
              width: 60,
              height: 60,
              float: "left",
              borderRadius: "50%",
              marginRight: 10
            }}
            alt=""
          /> : <div>
                <AccountCircle style={{fontSize: "60px", float: "left", marginRight:"10px"}} />
              </div> }
          
          <div>
            <p className="text-card">{fullName}</p>
            <p className="text-card text-card-rate">
              <Star
                style={{
                  color: "#ffc107",
                  fontSize: "1.3rem",
                  marginBottom: "4px"
                }}
              />
              {rated}
            </p>
          </div>
        </div>
        <div className="col-md-2">
          <p className="h5 text-card">{fee} $</p>
        </div>
        <div className="col-md-2 text-center">
          <button className="btn btn-secondary">Booking</button>
        </div>
      </div>
    );
  }
}

export default tripItem;
