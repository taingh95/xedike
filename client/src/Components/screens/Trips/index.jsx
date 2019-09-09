import React, { Component } from "react";
import axios from "axios";
import TripItem from "./trip-item";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

//propsTypes


class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      pages: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/trips/find/${this.state.currentPage}`)
      .then(res => {
        this.setState({
          trips: res.data.foundTrip,
          pages: res.data.pages
        });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.currentPage !== prevState.currentPage) {
      axios
      .get(`http://localhost:8080/api/trips/find/${this.state.currentPage}`)
      .then(res => {
        this.setState({
          trips: res.data.foundTrip,
          pages: res.data.pages
        });
      })
      .catch(err => console.log(err));
    }
  }

  handleOnSetPage = (count) => {
    this.setState({
      currentPage: count
    })
  }

  handleOnNextPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  handleOnPrevPage = () => {
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }

  handleOnFirstPage = () => {
    this.setState({
      currentPage: 1
    })
  }

  handleOnLastPage = () => {
    this.setState({
      currentPage: this.state.pages
    })
  }


  render() {
    return (
      <div className="d-flex flex-column">
        <div className="trip-list">
          {this.state.trips.map((trip, index) => {
            return <TripItem trip={trip} key={index} />;
          })}
        </div>
        {/* pagination */}
        <Pagination
          aria-label="Page navigation example"
          className="align-self-end"
        >
          <PaginationItem disabled={this.state.currentPage === 1 ? true : false}>
            <PaginationLink first onClick={this.handleOnFirstPage} />
          </PaginationItem>
          <PaginationItem disabled={this.state.currentPage === 1 ? true : false}>
            <PaginationLink previous onClick={this.handleOnPrevPage} />
          </PaginationItem>
          {[...Array(this.state.pages)].map((page, i) => (
            <PaginationItem  key={i} active={(i+1) === this.state.currentPage ? true : false}>
              <PaginationLink onClick={() => {this.handleOnSetPage(i+1)}} >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={this.state.currentPage === this.state.pages ? true : false} >
            <PaginationLink next onClick={this.handleOnNextPage} />
          </PaginationItem>
          <PaginationItem disabled={this.state.currentPage === this.state.pages ? true : false} >
            <PaginationLink last onClick={this.handleOnLastPage} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Trips;
