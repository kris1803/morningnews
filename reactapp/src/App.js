import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
//import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import './App.css';

import ScreenHome from './pages/Login/ScreenLogin';
import ScreenMyArticles from './pages/MyArticles/ScreenMyArticles';
import ScreenSource from './pages/Source/ScreenSource';
import ScreenArticlesBySource from './pages/ArticlesBySource/ScreenArticlesBySource';
import ScreenError from './pages/Error/ScreenError';

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
          <Route path="*" component={ScreenError} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
