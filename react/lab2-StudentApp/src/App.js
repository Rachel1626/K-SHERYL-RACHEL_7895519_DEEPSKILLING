import React, { Component } from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Student App</h1>
        <Home />
        <About />
        <Contact />
      </div>
    );
  }
}

export default App;
