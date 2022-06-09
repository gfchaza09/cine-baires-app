import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Store
import { store } from './store/store';

// Styles
import App from './App';

import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
