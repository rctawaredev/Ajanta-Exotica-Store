import Navbar from '../Navbar'
import './index.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(savedCart)

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(updatedCart)
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = () => {
    // Simple checkout flow: clear cart and show order placed message
    setOrderPlaced(true)
    setCartItems([])
    localStorage.setItem('cart', JSON.stringify([]))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="order-placed-page">
          <div className="order-placed-card">
            <img
              src="https://res.cloudinary.com/distnojxb/image/upload/v1768060466/img_ycooxu.png"
              alt="Order placed"
              className="order-placed-img"
            />
            <h1>Order Placed Successfully</h1>
            <p>Your order has been placed. You will receive a confirmation shortly.</p>
            <button className="primary-btn" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    )
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar/>
        <div className="cartCont">
          <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768060466/img_ycooxu.png"
            className="cartImg" 
          />
          <h1>Your Cart Is Empty</h1>
          <button className="shopNowBtn" onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar/>
      <div className="cart-page">
        <h1 className="cart-heading">Shopping Cart</h1>
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>by {item.brand}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className="item-total">₹{item.price * item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Total: ₹{calculateTotal()}</h2>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </>
  )
}

export default Cart