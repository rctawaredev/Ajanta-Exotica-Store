import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import Product from './components/Product'
import {Routes, Route } from 'react-router-dom'
const App=()=> {
    return (
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/products" element={<Product/>} />
      </Routes>

    )
}


export default App