import ReactTable from "react-table";
import 'react-table/react-table.css'
import React, { Component } from 'react';
import './App.css';
import AddItem from './AddItem';
import Weather from './Weather';

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
     <li key={index}>{item.product} {item.amount}</li>);

    return (
        <div className="App">
        <Weather />
        <br />

        <h2>Shopping List</h2>
        <AddItem addItem={this.addItem} />
        <ul>{listItems}</ul>

        </div>
    );
  }

}

export default App;
