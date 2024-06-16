import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Loading from './components/Loading';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Suspense fallback={<Loading/>}> */}
      <Router>
        <App />
      </Router>
    {/* </Suspense> */}
  </React.StrictMode>,
)
