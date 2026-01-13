import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import './index.css'
import AllProductsSection from '../AllProductsSection'

const PRODUCTS_LIMIT = 9

const Product = () => {
  const [productsList, setProductsList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getProducts = async currentPage => {
    try {
      setIsLoading(true)
      setError(null)

      const offset = (currentPage - 1) * PRODUCTS_LIMIT
      const apiUrl = `https://apis.ccbp.in/products?limit=${PRODUCTS_LIMIT}&offset=${offset}`
      const jwtToken = Cookies.get('jwt_token')

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()
        
        if (fetchedData && fetchedData.products && Array.isArray(fetchedData.products)) {
          const updatedData = fetchedData.products.map(product => ({
            title: product.title,
            brand: product.brand,
            id: product.id,
            imageUrl: product.image_url,
            price: product.price,
            rating: product.rating,
          }))
          setProductsList(updatedData)
          setHasMore(updatedData.length === PRODUCTS_LIMIT)
          setFilteredProducts(updatedData)
        } else {
          setError('Invalid data format received from API')
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.error_msg || 'Failed to fetch products. Please try again.')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts(page)
  }, [page])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    }
  }, [sortBy, ratingFilter, priceRange])

  // Apply filters and sorting
  useEffect(() => {
    try {
      if (!Array.isArray(productsList)) {
        setFilteredProducts([])
        return
      }

      let filtered = [...productsList]

      // Filter by rating
      if (ratingFilter) {
        filtered = filtered.filter(product => 
          product && typeof product.rating === 'number' && product.rating >= parseFloat(ratingFilter)
        )
      }

      // Filter by price range
      if (priceRange) {
        if (priceRange === 'under-500') {
          filtered = filtered.filter(product => product && typeof product.price === 'number' && product.price < 500)
        } else if (priceRange === '500-1000') {
          filtered = filtered.filter(product => product && typeof product.price === 'number' && product.price >= 500 && product.price <= 1000)
        } else if (priceRange === '1000-2000') {
          filtered = filtered.filter(product => product && typeof product.price === 'number' && product.price >= 1000 && product.price <= 2000)
        } else if (priceRange === 'above-2000') {
          filtered = filtered.filter(product => product && typeof product.price === 'number' && product.price > 2000)
        }
      }

      // Sort products
      if (sortBy === 'price-low-high') {
        filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0))
      } else if (sortBy === 'price-high-low') {
        filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0))
      } else if (sortBy === 'rating-high-low') {
        filtered.sort((a, b) => (b?.rating || 0) - (a?.rating || 0))
      }

      setFilteredProducts(filtered)
    } catch (err) {
      console.error('Error filtering products:', err)
      setFilteredProducts(productsList || [])
    }
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
        <div className="Products-Body">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>Error Loading Products</h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>{error}</p>
            <button 
              onClick={getProducts}
              style={{
                padding: '10px 20px',
                backgroundColor: '#0b69ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="Products-Body">
          <h1>All Products</h1>
          
          {/* Filters and Sort Section */}
          <div className="filters-section">
            <div className="filter-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">None</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Filter by Rating:</label>
              <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                <option value="">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range:</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">All Prices</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="above-2000">Above ₹2000</option>
              </select>
            </div>
          </div>

          <p className="products-count">
            Showing {filteredProducts.length} products {page > 1 && `(page ${page})`}
          </p>
          {filteredProducts.length > 0 ? (
            <>
              <AllProductsSection productsData={filteredProducts} />
              <div className="pagination-controls">
                <button
                  type="button"
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="page-indicator">Page {page}</span>
                <button
                  type="button"
                  className="page-btn"
                  disabled={!hasMore}
                  onClick={() => setPage(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#64748b', fontSize: '18px' }}>No products found</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Product