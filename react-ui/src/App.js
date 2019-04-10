import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Weather from './Weather';
import GitHub from './GitHub';
import ShoppingList from './ShoppingList';
import Contact from './Contact';
import Home from './Home';
import './App.css';

class App extends Component {


  render() {

    return (
        <div className="App">
        <BrowserRouter>
        <div>
            <Link to="/">Home</Link>{' '}
            <Link to="/weather">Weather</Link>{' '}
            <Link to="/github">GitHub</Link>{' '}
            <Link to="/shopping">Shopping List</Link>{' '}
            <Link to="/contact">Contact</Link>{' '}
            <Link to="/links">Links</Link>{' '}
            <Switch>
                <Route exact path="/" component={Home} />
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
