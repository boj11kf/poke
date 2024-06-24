import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { PokeBallLoader, LoadingProvider } from './components/Loader/PokeBallLoader.tsx';
import { Provider } from "react-redux";
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<PokeBallLoader/>}>
        <LoadingProvider>
          <Router>
            <App />
          </Router>
        </LoadingProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>

)
