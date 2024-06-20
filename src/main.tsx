import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Loading } from './components/Loading';
import { rootReducer } from './store/reducers/root-reducer.tsx';
import { Provider } from "react-redux";
import { Tuple, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import { actionCreators as pokemonActions } from '../src/store/actions/pokemons-actions';
import { thunk } from "redux-thunk";


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
  middleware: () => new Tuple(thunk/* , logger */),
});

/* store.dispatch<any>(pokemonActions.thunkInitPokemons()); */

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
