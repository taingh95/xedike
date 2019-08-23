import React from 'react'
import { Button} from "reactstrap";

function TripListRow(props) {
  
  return (
    <tr>
      <td>{props.trip.driverName}</td>
      <td>{props.trip.locationFrom}</td>
      <td>{props.trip.locationTo}</td>
      <td>{props.trip.availableSeats}</td>
      <td>{props.trip.startTime}</td>
      <td>{props.trip.fee} $</td>
      <td>
        <Button className="px-5"> Đặt xe </Button>
      </td>
    </tr>
  );
}
export default TripListRow;
