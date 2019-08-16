import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';

class App extends React.Component {

  render = () => {
      return (
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </Router>
      );

  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  }
}

export default App;
