import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import {Routes, Route } from 'react-router-dom'
const App=()=> {
    return (
      <Routes>
        <Route index element={<Home/>} />
        <Route path="Login" element={<Login />} />
        <Route path="Cart" element={<Cart/>} />
      </Routes>

    )
}


export default App