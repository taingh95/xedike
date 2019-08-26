import React from 'react'
import { Button} from "reactstrap";
import moment from "moment";


function TripListRow(props) {
  
  return (
    <tr>
      <td>{props.trip.driverId}</td>
      <td>{props.trip.locationFrom}</td>
      <td>{props.trip.locationTo}</td>
      <td>{props.trip.availableSeats}</td>
      <td>{moment(props.trip.startTime, "YYYY-MM-DD").format("MM/DD/YYYY")}</td>
      <td>{props.trip.fee}</td>
      <td>
        <Button className="px-5"> Đặt xe </Button>
      </td>
    </tr>
  );
}
export default TripListRow;
