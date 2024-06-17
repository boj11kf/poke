
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react';
import NavigationBar from './components/NavigationBar';
const HomePage = lazy(() => import('./components/Home-page'));
const CatchAndRelease  = lazy(() => import('./components/CatchAndRealese'));
import './App.css'


const App = () => {

  return (
    <>
      <NavigationBar />
      <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/catchAndRelease"} element={<CatchAndRelease/>} />
      </Routes>
    </>
  )
}

export default App
