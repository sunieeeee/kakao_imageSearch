import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import GlobalStyle from "./assets/style/GlobalStyle";
import Meta from "./components/Meta";

/** 리덕스 구성을 위한 참조 */
import {Provider} from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <Meta />
      <App />
    </BrowserRouter>
  </Provider>
);