
//import LoginPage from './components/Pages/Login-page';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode, lazy, useState } from 'react';
const LoginPage = lazy(() => import('./components/Pages/Login-page'));
const HomePage = lazy(() => import('./components/Pages/Home-page'));
const PokemonsPage = lazy(() => import('./components/Pages/Pokemons-page'));
const MyPokemonPage = lazy(() => import('./components/Pages/My-pokemons-page'));
const PokeModal = lazy(() => import('./components/Cards/Poke-modal'));
const Layout = lazy(() => import('./components/Layout'));
const ErrorPage = lazy(() => import('./components/Pages/Error-page'));
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Pokemon } from './types';

import './App.css';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const [searchInput, setSearchInput] = useState<string>('');
  const pokemons: Pokemon[] = useSelector((state: RootState) => state.pokemons.pokemons);


  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };


  return (
    <>
      <Routes location={background || location}>
        <Route path={"/"} element={<Layout handleSearchInputChange={handleSearchInputChange} />}>
          <Route path={"/"} element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route index path={"/login"} element={<LoginPage />} />
          <Route path={"/pokemons"} element={<RequireAuth><PokemonsPage pokemons={pokemons} searchInput={searchInput} /></RequireAuth>} />
          <Route path={"/my-pokemons"} element={<RequireAuth><MyPokemonPage pokemons={pokemons} searchInput={searchInput} /></RequireAuth>} />
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<ErrorPage message={"Page Not Found"} />} />
        </Route>
      </Routes>
      {
        background &&
        <Routes>
          {/* <Route path={"/pokemons/pokemon/:id"} element={<RequireAuth><PokeModal /></RequireAuth>} />
          <Route path={"/my-pokemons/pokemon/:id"} element={<RequireAuth><PokeModal /></RequireAuth>} /> */}
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<ErrorPage message={"Page Not Found"} />} />
        </Routes>
      }
    </>
  )
}

export default App

// Mock function to check if the user is logged in
const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('token');
};

interface RequireAuthProps {
  children: ReactNode;
}

// Component to protect routes that require authentication
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

/* interface RedirectIfLoggedInProps {
  children: ReactNode;
  redirectTo?: string;
}

// Component to prevent access to certain routes if user is logged in
const RedirectIfLoggedIn: React.FC<RedirectIfLoggedInProps> = ({ children, redirectTo = '/' }) => {
  if (isLoggedIn()) {
    // User is logged in, redirect to the specified route
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}; */