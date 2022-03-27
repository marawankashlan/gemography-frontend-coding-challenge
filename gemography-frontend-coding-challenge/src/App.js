import logo from './logo.svg';
import React from 'react';
import Main from "./components/main"
import Navbar from './components/navbar';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
          return (
              <div className="App">
                      <Navbar />
                      <Main />
              </div>
        );
  }
}
export default App;
