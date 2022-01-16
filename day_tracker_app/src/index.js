import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoriesProvider } from "./contexts/CategoryContext"
ReactDOM.render(
  <React.StrictMode>
    <CategoriesProvider>
      <App />
    </CategoriesProvider>
  </React.StrictMode>,
  document.getElementById('root'), document.querySelector('#app')
);

