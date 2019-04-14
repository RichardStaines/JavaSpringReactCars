import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {SERVER_URL} from '../../constants.js';
import './CarList.css';

class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    fetchCars() {
        fetch(SERVER_URL+'api/cars')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState(
                {cars: responseData._embedded.cars}
            );
        })
        .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchCars();
    }

    confirmDelete(row) {
        confirmAlert({
            message: 'Are you sure you want to delete?',
            buttons:
                [
                    {
                        label: 'Yes',
                        onClick: () => this.OnDelClick(row)
                    },
                    {
                        label: 'No',
                        onClick: () => toast.success("Delete Aborted",
                                            {position: toast.POSITION.BOTTOM_LEFT}
                                        )
                    }
                ]
        })
    }

    onDelClick(row) {
        fetch(row, {method: 'DELETE'})
        .then(res =>
            {
                toast.success("Car deleted",
                    {position: toast.POSITION.BOTTOM_LEFT}
                );
                this.fetchCars();
            }
        )
        .catch(err => {
            toast.error("Error when deleting",
                {position: toast.POSITION.BOTTOM_LEFT}
            );
            console.error(err)
        });
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
                Header: 'Price (£)', accessor: 'price'
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '_link.self.href',
                Cell: ({value}) =>
                    (
                    <IconButton onClick={() =>
                        {this.confirmDelete(value)}}
                     > <DeleteIcon className="DeleteIcon"/></IconButton>
                    )
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
                    <ToastContainer autoClose={1500} />
                </header>

            </div>
        );
    }

}

export default CarList;
