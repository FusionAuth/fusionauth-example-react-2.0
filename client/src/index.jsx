import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './components/Greeting.js';
import LogInOut from './components/LogInOut.js';
const config = require('./config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {} // this is the body from /user
    };
  }

  componentDidMount() {
    fetch(`http://localhost:${config.serverPort}/user`, {
      credentials: 'include' // fetch won't send cookies unless you set credentials
    })
      .then(response => response.json())
      .then(response => this.setState(
        {
          body: response
        })
      );
  }

  render() {
    return (
      <div id='App'>
        <header>
          <h1>FusionAuth Example: React</h1>
          <Greeting body={this.state.body}/>
          <LogInOut body={this.state.body} uri={`http://localhost:${config.serverPort}`}/>
        </header>
        <footer>
          <a href='https://fusionauth.io/docs/v1/tech/tutorials/'>Learn how this app works.</a>
          <a href='https://twitter.com/fusionauth'>Tweet your questions at us.</a>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
