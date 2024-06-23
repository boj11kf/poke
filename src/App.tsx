
import LoginPage from './components/Pages/Login-page';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode, lazy, useState } from 'react';
const HomePage = lazy(() => import('./components/Pages/Home-page'));
const PokemonsPage = lazy(() => import('./components/Pages/Pokemons-page'));
const MyPokemonPage = lazy(() => import('./components/Pages/My-pokemons-page'));
const PokeModal = lazy(() => import('./components/Cards/Poke-modal'));
const Layout = lazy(() => import('./components/Layout'));
const ErrorPage = lazy(() => import('./components/Pages/Error-page'));
import './App.css';


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };


  return (
    <>
      <Routes location={background || location}>
        <Route path={"/"} element={<Layout handleSearchInputChange={handleSearchInputChange} />}>
          <Route index path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/pokemons"} element={<RequireAuth><PokemonsPage searchInput={searchInput} /></RequireAuth>}/>
          <Route path={"/my-pokemons"} element={<RequireAuth><MyPokemonPage /></RequireAuth>}/>
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<ErrorPage message={"Page Not Found"} />} />
        </Route>
      </Routes>
      {
        background &&
        <Routes>
          <Route path={"/pokemons/pokemon/:id"} element={<RequireAuth><PokeModal /></RequireAuth>} />
          <Route path={"/my-pokemons/pokemon/:id"} element={<RequireAuth><PokeModal /></RequireAuth>} />
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
  // Implement your logic to check if the user is logged in
  // For example, checking a token in localStorage
  return !!localStorage.getItem('token');
};

interface RequireAuthProps {
  children: ReactNode;
}

// Component to protect routes that require authentication
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  if (!isLoggedIn()) {
    // User is not logged in, redirect to login page
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