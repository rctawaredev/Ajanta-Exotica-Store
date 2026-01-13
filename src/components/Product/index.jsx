import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import './index.css'
import AllProductsSection from '../AllProductsSection'

const Product = () => {
  const [productsList, setProductsList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const getProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const apiUrl = `https://apis.ccbp.in/products`
      const jwtToken = Cookies.get('jwt_token')

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()

        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          id: product.id,
          imageUrl: product.image_url,
          price: product.price,
          rating: product.rating,
        }))

        setProductsList(updatedData)
        setFilteredProducts(updatedData)
      } else {
        setError('Failed to fetch products')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    let filtered = [...productsList]

    if (ratingFilter) {
      filtered = filtered.filter(p => p.rating >= parseFloat(ratingFilter))
    }

    if (priceRange === 'under-500') {
      filtered = filtered.filter(p => p.price < 500)
    } else if (priceRange === '500-1000') {
      filtered = filtered.filter(p => p.price >= 500 && p.price <= 1000)
    } else if (priceRange === '1000-2000') {
      filtered = filtered.filter(p => p.price >= 1000 && p.price <= 2000)
    } else if (priceRange === 'above-2000') {
      filtered = filtered.filter(p => p.price > 2000)
    }

    if (sortBy === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating-high-low') {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }, [productsList, sortBy, ratingFilter, priceRange])

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="loader-cont">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      ) : error ? (
        <div style={{textAlign: 'center', padding: 40}}>
          <h3>{error}</h3>
        </div>
      ) : (
        <div className="Products-Body">
          <h1>All Products</h1>

          <div className="filters-section">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="">Sort</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating-high-low">Rating: High to Low</option>
            </select>

            <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
              <option value="">Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
              <option value="">Price</option>
              <option value="under-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-2000">₹1000 - ₹2000</option>
              <option value="above-2000">Above ₹2000</option>
            </select>
          </div>

          <p>Showing {filteredProducts.length} products</p>

          <AllProductsSection productsData={filteredProducts} />
        </div>
      )}
    </>
  )
}

export default Product

