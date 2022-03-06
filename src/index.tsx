import React from 'react';
import ReactDOM from 'react-dom';
import OneSignal from 'react-onesignal';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

OneSignal.init({ appId: 'd6c052e8-53c7-4f7b-87ca-dee1a0cac880' });
