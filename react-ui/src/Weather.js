import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {
  constructor(props) {
      super(props);
      this.state = {temp: 0, desc: '', icon: '', loading: true}
  }


componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&APIkey=b6910acdab0d2b731000bbdea40922c8')
    .then(response => response.json())
    .then(responseData => {
        this.setState(
            {
            temp: responseData.main.temp,
            desc: responseData.weather[0].description,
            icon: responseData.weather[0].icon,
            loading: false
            }
        )})
        .catch(err => console.error(err));
    }

  render() {
    const imgSrc = 'http://openweathermap.org/img/w/' +
                    this.state.icon + '.png';

    if (this.state.loading) {
        return <p>Loading...</p>;
    }
    else {
    return (
        <div className="Weather">
        <p>Temperature: {this.state.temp} &deg;C</p>
        <p>Description: {this.state.desc}</p>
        <img src={imgSrc} alt="Weather icon" />
        </div>
    );
    }


  }

}

export default Weather;
