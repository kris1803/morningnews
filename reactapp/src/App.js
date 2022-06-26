import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import './App.css';

import ScreenLogin from './pages/Login/ScreenLogin';
import ScreenMyArticles from './pages/MyArticles/ScreenMyArticles';
import ScreenSource from './pages/Source/ScreenSource';
import ScreenArticlesBySource from './pages/ArticlesBySource/ScreenArticlesBySource';
import ScreenError from './pages/Error/ScreenError';

import user from './reducers/user.reducer.js';
import wishlist from './reducers/wishlist.reducer.js';

let store = configureStore({ reducer: { wishlist, user } });

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ScreenLogin/>} key='index' />
        <Route path="/my-articles" element={<ScreenMyArticles/>} key='my-articles' />
        <Route path="/source" element={<ScreenSource/>} key='source' />
        <Route path="/articles-by-source/:id" element={<ScreenArticlesBySource/>} key='articles-by-source-id' />
        <Route path="*" element={<ScreenError/>} key='not-found' />
      </Routes>
    </Provider>
  );
}

export default App;
