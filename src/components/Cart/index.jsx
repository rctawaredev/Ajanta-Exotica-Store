import Navbar from '../Navbar'
import './index.css'
const Cart=()=> {
    return (
        <>
            <Navbar/>
            <div className="cartCont">
                <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768060466/img_ycooxu.png"
                    className="cartImg" 
                />
                <h1>Your Cart Is Empty</h1>
                <button className="shopNowBtn">Shop Now</button>

            </div>
            

        </>
    )
}

export default Cart