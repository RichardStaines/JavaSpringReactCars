import React, {Component } from 'react';
import {SERVER_URL} from '../../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';

import CarList from './CarList.js';
import './CarList.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {username : '', password: '', isAuthenticated: false, open: false};
    }

    handleClose = (event) => {
        this.setState({open: false});
    }

    login = () => {
        const user = {username: this.state.username, password: this.state.password};

        const loginUrl = SERVER_URL + 'login';
        console.log(loginUrl);
        console.log(JSON.stringify(user));

        fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            console.log(res);

            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                this.setState({isAuthenticated: true})
            } else {
                this.setState({open: true});
            }
        })
        .catch(err => console.error(err))
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        if (this.state.isAuthenticated === true)
        {
            return (<CarList />);
        }
        else {
          return (
            <div className="CarList">
            <SnackBar open={this.state.open} onClose={this.handleClose}
                autoHideDuration={1500}
                message='Check your username and password' />

            <br />
                <TextField name="username" placeholder="Username"
                    onChange={this.handleChange}
                /> <br />
                <TextField name="password" placeholder="Password"
                    onChange={this.handleChange}
                /> <br />
                <br />
                <Button variant="contained" color="primary"
                    onClick={this.login}>Login
                </Button>
            </div>
          )
        }
    }

}

export default Login;
