import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Loading } from './components/Loading';
import { rootReducer } from './store/reducers/root-reducer.tsx';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(thunk),
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
