import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import React, { Component } from 'react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state =  { term: "", currentLocation: ""};
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.googleApiCall = this.googleApiCall.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  componentWillMount() {
    let currentLocation = navigator.geolocation;
    if(currentLocation) { 

      const setCoords = (pos) => {
        this.setState({ currentLocation: {lat: pos.coords.latitude, lng: pos.coords.longitude} });
      };

      currentLocation.getCurrentPosition(setCoords);
    } else {
      this.setState({ currentLocation: {lat: 35.3733, lng: 119.0187} });
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.googleApiCall(this.state.term);
    this.setState({ term: "" });
  }

  googleApiCall(data) {
    const result = new Promise((resolve, reject) => {
      let response;
      let coords;

      resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + data + '&sensor=true'))
        .then((payload) => {
          return payload;
        })
        .catch((response) => {
          console.log(response, "Something done broke in googleApiCall");
        });
      })

      result
        .then( (coords) => {
          let location = {
            lat: coords.data.results[0].geometry.location.lat,
            lng: coords.data.results[0].geometry.location.lng
          }
          
          this.renderMap(location);
      });
  }

  renderMap(coords) {
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
      center: coords.data,
      zoom: 10 
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-capitalize text-center">phoenix rising</h1>
        
        <p className="lead">This app shows a brief demonstration of using React with Phoenix and Elixir. Enter in a city and state (city, state) and it will be passed to the Google Places API then we will render some results.
        </p>

        <form onSubmit={ this.onFormSubmit }>
          <div className="col-lg-12">
            <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Please enter a place or location..."
                  value={ this.state.term }
                  onChange={ (event) => this.setState({ term: event.target.value })}
                  />
                <span className="input-group-btn">
                  <button 
                  className="btn btn-default" 
                  type="submit"
                  type="submit"
                  onClick={ this.onFormSubmit }
                  >Search</button>
                </span>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

ReactDOM.render(
  <Index />, document.getElementById("react-app")
);