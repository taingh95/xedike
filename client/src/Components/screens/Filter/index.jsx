import React, { Component } from 'react'
import FilterForm from '../../layouts/filter-form'
import TripItem from '../Trips/trip-item'



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: []
        }
    }
    render() {
        return (
            <div className="container" style={{marginTop: "15vh"}}>
                <FilterForm />
                <div className="text-header h3 my-5"> Filtered Trips</div>
                {/* <TripItem /> */}
                <div className="mb-5"></div>
            </div>
        )
    }
}


export default Filter;
