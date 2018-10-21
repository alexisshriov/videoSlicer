import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Main from './components/Main'
import './App.css';
import configureStore from './store/configureStore'

class App extends Component {
  render() {
    const store = configureStore()
    
    return (
      <Provider store = {store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
