import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

import {SERVER_URL} from '../../constants.js';
import './CarList.css';

class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    componentDidMount() {
        fetch(SERVER_URL+'api/cars')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState(
                {cars: responseData._embedded.cars}
            );
        })
        .catch(err => console.error(err));
    }

    render() {
        const columns = [
            {
                Header: 'Brand', accessor: 'brand'
            },
            {
                Header: 'Model', accessor: 'model'
            },
            {
                Header: 'Colour', accessor: 'colour'
            },
            {
                Header: 'Registration', accessor: 'registrationNumber'
            },
            {
                Header: 'Year', accessor: 'year'
            },
            {
                Header: 'Price', accessor: 'price'
            }
        ]
        return (
            <div className="CarList">
                <header className="CarList-header">
                    <h1 className="CarList-title">Car List</h1>

                    <ReactTable
                        data={this.state.cars}
                        columns={columns}
                        filterable={true}
                        defaultPageSize = {10}
                    />
                </header>

            </div>
        );
    }

}

export default CarList;
