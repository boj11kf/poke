
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import { HomePage } from './components/Home-page';
import { CatchAndRelease } from './components/CatchAndRealese';
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
