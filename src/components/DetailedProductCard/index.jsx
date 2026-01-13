import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import './index.css'
const DetailedProductCard=()=> {
    const [isLoading, setIsLoading] = useState(true)
    const {id}= useParams()
    const [detailedProductData, setDetailedProductData]= useState({})

    const jwtToken= Cookies.get('jwt_token')
    const getDetailedProductInfo= async ()=> {
        const apiUrl = `https://apis.ccbp.in/products/${id}`;
        const options = {
        method:'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      }
      const response= await fetch(apiUrl,options)

      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData)

        const ProductData = {
        title: fetchedData.title,
        brand: fetchedData.brand,
        description:fetchedData.description,
        availability:fetchedData.availability,
        style:fetchedData.style,
        total_reviews:fetchedData.total_reviews,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        price: fetchedData.price,
        rating: fetchedData.rating,
        };
        setDetailedProductData(ProductData)
        setIsLoading(false)
        }


    }

    useEffect(()=> {
        getDetailedProductInfo()
    },[id])


    const addToCart = (detailedProductData) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already exists in cart
    const existingItem = existingCart.find(item => item.id === detailedProductData.id)
    
    if (existingItem) {
      // If exists, increase quantity
      existingItem.quantity += 1
    } else {
      // If new, add with quantity 1
      existingCart.push({...detailedProductData, quantity: 1})
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Trigger custom event to update cart count in Navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

    return (
  <>
    {isLoading ? (
      <div className="loader-cont">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    ) : (
      <>
        <Navbar />
        <div className="width-80-percent">
          <div>
            <img src={detailedProductData.imageUrl} className="productImg" />
          </div>

          <div className="textContainer">
            <h1 className="title">{detailedProductData.title}</h1>
            <p className="price">Rs {detailedProductData.price}/-</p>
            <p className="description">{detailedProductData.description}</p>

            <div className="ratingContt">
              <p className="rating">{detailedProductData.rating}</p>
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1768209989/star-img_rgloif.png"
                className="starImg"
                alt="rating"
              />
            </div>

            <p className="available">
              <span className="available-title">Available: </span>
              {detailedProductData.availability}
            </p>

            <p className="brand">
              <span className="brand-title">Brand: </span>
              {detailedProductData.brand}
            </p>
            <div>
                <button
                className="add-to-cart-btn"
                onClick={() => addToCart(detailedProductData)}
                >
                Add to Cart
                </button>
            </div>
          </div>
        </div>
      </>
    )}
  </>
);
    
}

export default DetailedProductCard


