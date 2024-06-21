
import LoginPage from './components/Pages/Login-page';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import NavigationBar from './components/NavigationBar';
const HomePage = lazy(() => import('./components/Pages/Home-page'));
const PokemonsPage = lazy(() => import('./components/Pages/Pokemons-page'));
const MyPokemonPage = lazy(() => import('./components/Pages/My-pokemons-page'));
import './App.css';


const App = () => {

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/pokemons"} element={<PokemonsPage />} />
        <Route path={"/my-pokemons"} element={<MyPokemonPage />} />
      </Routes>
    </>
  )
}

export default App
