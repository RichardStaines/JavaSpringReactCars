import React from 'react';
import SkyLight from 'react-skylight';
import RaisedButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './AddCar.css';

class AddCar extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            brand: '',
            model: '',
            year: '',
            colour: '',
            registrationNumber: '',
            price: ''
        };
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit = (event) => {
        console.log("User pressed Submit");
        event.preventDefault();
        var newCar = {
            brand: this.state.brand,
            model: this.state.model,
            colour: this.state.colour,
            registrationNumber: this.state.registrationNumber,
            year: this.state.year,
            price: this.state.price
        };
        this.props.addCar(newCar);
        this.refs.addDialog.hide();
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
        console.log("User aborted Add Car via Cancel Button");
    }

    render() {
        return (
            <div>
            <SkyLight hideOnOverlayClicked ref="addDialog"  title="Add New Car" className="AddCar">
                <TextField type="text" name="brand" label="Brand" required
                    onChange={this.handleChange}
                    placeholder="Brand" />
                <br />
                <TextField type="text" name="model" label="Model" required
                    onChange={this.handleChange}
                    placeholder="Model" />
                <br />
                <TextField type="text" name="colour" label="Colour" required
                    onChange={this.handleChange}
                    placeholder="Colour" />
                <br />
                <TextField type="text" name="registrationNumber" label="Registration Number" required
                    onChange={this.handleChange}
                    placeholder="RegistrationNumber" />
                <br />
                <TextField type="text" name="year" label="Year" required
                    onChange={this.handleChange}
                    placeholder="Year" />
                <br />
                <TextField type="text" name="price" label="Price (£)" required
                    onChange={this.handleChange}
                    placeholder="Price" />
                <br /><br />
                <RaisedButton
                    onClick={this.handleSubmit}
                    variant="contained" color="primary"
                >Save</RaisedButton>
                <RaisedButton
                    onClick={this.cancelSubmit}
                    variant="contained" color="primary"
                >Cancel</RaisedButton>
            </SkyLight>
            <div>
                <RaisedButton
                    style={{'margin': '10px'}}
                    onClick={() => this.refs.addDialog.show()}
                    variant="contained" color="primary"
                >Add New Car</RaisedButton>
            </div>
            </div>
        );
    }
}

export default AddCar;