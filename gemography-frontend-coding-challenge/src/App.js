import logo from './logo.svg';
import React from 'react';
import Main from "./components/main"
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
          return (
              <div className="App">
                      <Main />
              </div>
        );
  }
}
export default App;
