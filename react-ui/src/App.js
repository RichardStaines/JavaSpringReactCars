import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Weather from './Weather';
import GitHub from './GitHub';
import ShoppingList from './ShoppingList';
import Contact from './Contact';
import Home from './Home';
import CarList from './CarList';
import './App.css';

class App extends Component {


  render() {

    return (
        <div className="App">
        <BrowserRouter>
        <div className="App-navBar">
            <Link className="App-link" to="/">Home</Link>{' '}
            <Link className="App-link" to="/carlist">Car List</Link>{' '}
            <Link className="App-link" to="/weather">Weather</Link>{' '}
            <Link className="App-link" to="/github">GitHub</Link>{' '}
            <Link className="App-link" to="/shopping">Shopping List</Link>{' '}
            <Link className="App-link" to="/contact">Contact</Link>{' '}
            <Link className="App-link" to="/links">Links</Link>{' '}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/carlist" component={CarList} />
                <Route exact path="/weather" component={Weather} />
                <Route exact path="/github" component={GitHub} />
                <Route exact path="/shopping" component={ShoppingList} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/links" render={()=> <h1>Links</h1>} />
                <Route render={()=> <h1>Page not found</h1>} />
            </Switch>
        </div>
        </BrowserRouter>
        </div>
    );
  }

}

export default App;
