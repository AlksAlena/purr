import React, { Component } from 'react';
import { connect } from 'react-redux';

import Desk from './components/Desk.jsx';
import NewUserPopup from './components/NewUserPopup.jsx';

class App extends Component {
  render() {
    return(   
      <div className="container app">
        { this.props.author ? 
          <h1 className="app-title">Hi, { this.props.author }!</h1> : 
          <h1 className="app-title">Frello - powerful app for managing your tasks
            <small>Get's started it's FREE!</small>
          </h1> 
        }
          
        <Desk />  
        { this.props.author ? '' : <NewUserPopup /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    author: state.columnsReducer.author
  }
};

export default connect(mapStateToProps)(App)