import './index.css'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load cart count from localStorage
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    }

    updateCartCount()

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <nav>
      <div className="navContainer">
        <ul>
          <li>
            <Link className="nav-link" to="/">
              <h1><span className="ajanta">Ajanta</span> <span className="exotica">Exotica</span></h1>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/" className="nav-link"><p>Home</p></Link>
          </li>
          <li>
            <Link to="/products" className="nav-link"><p>Products</p></Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link cart-link">
              <p>Cart</p>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={onClickLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar