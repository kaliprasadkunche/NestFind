// // src/index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { CssBaseline } from '@mui/material';


// ReactDOM.render(
//     <React.StrictMode>
//         <CssBaseline />
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );


// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store'; // Import your Redux store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider and pass store */}
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
