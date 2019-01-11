import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import GalleryPage from './Screens/GalleryPage.js'
import UserPage from './Screens/UserPage.js'

import './App.css';

import user from './Components/user.reducer';
import dataModal from './Components/dataModal.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({user, dataModal}));


class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={GalleryPage}></Route>
              <Route exact path="/UserPage" component={UserPage}></Route>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
