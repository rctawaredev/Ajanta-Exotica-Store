import './index.css'
import {Link} from 'react-router-dom'

const AllProductsSection = ({productsData}) => {

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
        </Link>
        </li>
      ))}
    </ul>
  )
}

export default AllProductsSection