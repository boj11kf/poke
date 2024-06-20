
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { lazy, useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
const HomePage = lazy(() => import('./components/Home-page'));
//const CatchAndRelease = lazy(() => import('./components/CatchAndRealese'));
import  CatchAndRelease  from './components/CatchAndRealese';
const MyPokemonList = lazy(() => import('./components/My-pokemon-list'));
import { actionCreators as pokemonActions } from '../src/store/actions/pokemons-actions';
import './App.css'
import { useDispatch } from 'react-redux';


const App = () => {

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch<any>(pokemonActions.thunkInitPokemons());
  }, [dispatch]);



  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/catchAndRelease"} element={<CatchAndRelease />} />
        <Route path={"/myPokemonList"} element={<MyPokemonList />} />
      </Routes>
    </>
  )
}

export default App
