import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
//import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

import user from './reducers/user.reducer.js';
import wishlist from './reducers/wishlist.reducer.js';
let store = configureStore({ reducer: { wishlist, user } } );

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/my-articles" component={ScreenMyArticles} />
          <Route path="/source" component={ScreenSource} />
          <Route path="/articles-by-source/:id" component={ScreenArticlesBySource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
