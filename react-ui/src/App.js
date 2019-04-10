import ReactTable from "react-table";
import 'react-table/react-table.css'
import React, { Component } from 'react';
import './App.css';
import AddItem from './AddItem';
import Weather from './Weather';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
         items: [],
         url: '',
         keyword: '',
         details: '',
         data: []
        };
    }

    addItem = (item) => {
        this.setState( {items: [item, ...this.state.items] });
    }

  render() {

    const listItems = this.state.items.map((item, index) =>
         <ListItem key={index}>
         <ListItemText primary={item.product} secondary={item.amount} />
         </ListItem>
     );

    return (
        <div className="App">

        <h2>Shopping List</h2>
        <AddItem addItem={this.addItem} />
        <List>{listItems}</List>

        <br />
        <Weather />

        </div>
    );
  }

}

export default App;
