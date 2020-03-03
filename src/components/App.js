import React, { Component, Fragment } from 'react';
import Welcome from './Welcome.js';
import Header from './Header.js';
import Main from './Main.js';


class App extends Component {
  constructor() {
    super()

    this.state = {
      notEntered: true,
    }
  }


  toggleEnteredState = () => {

    this.setState({
      notEntered: !this.state.notEntered
    })
  }


  render() {
    return (
      <div className="App">
        {
          this.state.notEntered 
            ? <Welcome enterButtonClicked={this.toggleEnteredState} /> 
            : <Fragment>
                <Header />
                <Main />
              </Fragment>
        }
      </div>
    );
  }
}

export default App;
