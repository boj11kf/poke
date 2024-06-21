
import LoginPage from './components/Pages/Login-page';
import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy } from 'react';
const HomePage = lazy(() => import('./components/Pages/Home-page'));
const PokemonsPage = lazy(() => import('./components/Pages/Pokemons-page'));
const MyPokemonPage = lazy(() => import('./components/Pages/My-pokemons-page'));
const PokeModal = lazy(() => import('./components/Cards/Poke-modal'));
const Layout = lazy(() => import( './components/Layout'));
const ErrorPage = lazy(() => import('./components/Pages/Error-page'));
import './App.css';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={"/"} element={<Layout />} errorElement={<ErrorPage message={"Page Not Found"} />}>
          <Route index path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/pokemons"} element={<PokemonsPage />} />
          <Route path={"/my-pokemons"} element={<MyPokemonPage />} />
        </Route>
      </Routes>
      {
        background &&
        <Routes>
          <Route path={"/pokemons/pokemon/:id"} element={<PokeModal />} />
          <Route path={"/my-pokemons/pokemon/:id"} element={<PokeModal />} />
        </Routes>
      }
    </>
  )
}

export default App
