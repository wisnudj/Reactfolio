import React, { Component } from 'react';
import Container from './src/Container';
import { Provider } from 'react-redux'
import store from './src/Store'

class App extends Component<{}> {
  render() {
    return(
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

export default App
