import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor () {
    super()
    this.state = {
      endpoint: 'https://vbwvkq4zud.execute-api.us-east-1.amazonaws.com/dev',
      locations: []
    }
    axios.get(this.state.endpoint)
      .then(response => {
        // console.log(response.data)
        this.setState({ locations: response.data})
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }

  render() {
    return (
      <div>
        <h1>Near Me</h1>
        <ul>
          { this.state.locations.length > 0 ? 
            this.state.locations.map(location => <li>{location}</li>)
            :
            <p>Loading from <a href={this.state.endpoint}>{this.state.endpoint}</a></p>
          }
        </ul>
      </div>
    );
  }
}

export default App;
