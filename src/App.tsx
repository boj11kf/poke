
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import { HomePage } from './components/Home-page';
import './App.css'


const App = () => {

  return (
    <>
      <NavigationBar />
      <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
      </Routes>
    </>
  )
}

export default App
