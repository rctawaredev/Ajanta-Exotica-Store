import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import './index.css'
const DetailedProductCard=()=> {
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
        }


    }

    useEffect(()=> {
        getDetailedProductInfo()
        console.log(detailedProductData)
    },[id])

    return (
        <>
        <Navbar/>
        <div className="width-80-percent">
            <div>
                <img src={detailedProductData.imageUrl}
                className="productImg"/>

            </div>
            <div className="textContainer">
                <h1 className="title">{detailedProductData.title}</h1>
                <p className="price">{`Rs ${detailedProductData.price}/-`}</p>
                <p className="description">{detailedProductData.description}</p>
                <div className="ratingContt">
                <p className="rating">{detailedProductData.rating}</p>
                <img
                    src="https://res.cloudinary.com/distnojxb/image/upload/v1768209989/star-img_rgloif.png"
                    className="starImg"
                    alt="rating"
                />
                </div>
                <p className="available"><span className="available-title">Available: </span> {detailedProductData.availability}</p>
                <p className="brand"><span className="brand-title">Brand: </span> {detailedProductData.brand}</p>
                
    


            </div>


        </div>

        </>
    )
}

export default DetailedProductCard


