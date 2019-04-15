import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RaisedButton from '@material-ui/core/Button';
import { CSVLink } from 'react-csv';
import Grid from '@material-ui/core/Grid';

import AddCar from './AddCar.js';
import {SERVER_URL} from '../../constants.js';
import './CarList.css';

class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    printError(err) {
        console.error(err);
        toast.error(err,
            {position: toast.POSITION.BOTTOM_LEFT}
        );
    }

    fetchCars() {
        fetch(SERVER_URL+'api/cars')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState(
                {cars: responseData._embedded.cars}
            );
        })
        .catch(err => this.printError(err));
    }

    addCar(car) {
        console.log("addCar: " + car);
        fetch(SERVER_URL+'api/cars',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(car)
            }
        )
        .then(res => this.fetchCars)
        .catch(err => this.printError(err))
    }

    componentDidMount() {
        this.fetchCars();
    }

    confirmSave(link, row) {
        console.log("confirm save - " + link + " Vals: " + row);
        confirmAlert({
            message: 'Are you sure you want to save?',
            buttons:
                [
                    {
                        label: 'Yes',
                        onClick: () => this.onSaveClick(link, row)
                    },
                    {
                        label: 'No',
                        onClick: () => toast.success("Save Aborted",
                                            {position: toast.POSITION.BOTTOM_LEFT}
                                        )
                    }
                ]
        })
    }

    confirmDelete(row) {
        console.log("confirm delete - " + row);
        confirmAlert({
            message: 'Are you sure you want to delete?',
            buttons:
                [
                    {
                        label: 'Yes',
                        onClick: () => this.onDelClick(row)
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
        .catch(err =>
            this.printError(err)
        );
    }

    onSaveClick(link, car) {
        fetch(link,
            {method: 'PUT',
             headers: {'Content-Type': 'application/json'},
             body:  JSON.stringify(car)
        })
        .then(res =>
            {
                toast.success("Car changes saved",
                    {position: toast.POSITION.BOTTOM_LEFT}
                );
                this.fetchCars();
            }
        )
        .catch(err =>
            this.printError(err)
        );
    }

    renderEditable = (cellInfo) => {
        return (
            <div
             className="EditableCell"
             contentEditable
             suppressContentEditableWarning
             onBlur={e => {
                const data = [...this.state.cars];
                data[cellInfo.index][cellInfo.column.id] =
                    e.target.innerHTML;
                this.setState({ cars: data });
             }}
             dangerouslySetInnerHTML={{
                __html: this.state.cars[cellInfo.index][cellInfo.column.id]
             }}
             />
        );
    }

    render() {
        const columns = [
            {
                Header: 'Brand', accessor: 'brand',
                Cell: this.renderEditable
            },
            {
                Header: 'Model', accessor: 'model',
                Cell: this.renderEditable
            },
            {
                Header: 'Colour', accessor: 'colour',
                Cell: this.renderEditable
            },
            {
                Header: 'Registration', accessor: 'registrationNumber',
                Cell: this.renderEditable
            },
            {
                Header: 'Year', accessor: 'year',
                Cell: this.renderEditable
            },
            {
                Header: 'Price (£)', accessor: 'price',
                Cell: this.renderEditable
            },
            {
                id: 'savebutton',
                sortable: false,
                filterable: false,
                width: 75,
                accessor: '_links.self.href',
                Cell: ({value, row}) =>
                    (
                    <RaisedButton onClick={() =>
                        {this.confirmSave(value, row)}}
                        variant="contained" color="primary"
                     >Save</RaisedButton>
                    )
            },
            {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 50,
                accessor: '_links.self.href',
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
                    <Grid container>
                        <Grid item>
                            <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
                        </Grid>
                        <Grid item style={{padding: 20}}>
                            <CSVLink className="CSVList" data={this.state.cars} seperator=";">Export to CSV</CSVLink>
                        </Grid>
                    </Grid>
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
