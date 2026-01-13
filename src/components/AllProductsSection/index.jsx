import './index.css'
import {Link} from 'react-router-dom'

const AllProductsSection = ({productsData}) => {
  const addToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already exists in cart
    const existingItem = existingCart.find(item => item.id === product.id)
    
    if (existingItem) {
      // If exists, increase quantity
      existingItem.quantity += 1
    } else {
      // If new, add with quantity 1
      existingCart.push({...product, quantity: 1})
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Trigger custom event to update cart count in Navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

  if (!productsData || !Array.isArray(productsData) || productsData.length === 0) {
    return null
  }

  return (
    <ul className="products-list">
      {productsData.map(eachProduct => (
        <li key={eachProduct.id} className="card">
        <Link to={`/products/${eachProduct.id}`} className="Link-Item">
          <img
            src={eachProduct.imageUrl}
            alt={eachProduct.title}
            className="product-img"
          />

          <h3>{eachProduct.title}</h3>
          <p>{`by ${eachProduct.brand}`}</p>

          <div className="priceStarFlexCont">
            <p className="priceText">₹{eachProduct.price}</p>

            <div className="ratingCont">
              <p className="rating">{eachProduct.rating}</p>
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1768209989/star-img_rgloif.png"
                className="starImg"
                alt="rating"
              />
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={() => addToCart(eachProduct)}>
            Add to Cart
          </button>
        </Link>
        </li>
      ))}
    </ul>
  )
}

export default AllProductsSection