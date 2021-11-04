import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import store from './store/store';
import 'antd/dist/antd.css'

ReactDOM.render(
  <Provider store= {store}>
    <HashRouter>
        <App />
    </HashRouter>
  </Provider>
    
  ,
  document.getElementById('root')
);

