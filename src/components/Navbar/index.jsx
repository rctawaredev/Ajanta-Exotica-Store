import './index.css'

const Navbar=()=> {
    return(
        <nav>
            <div className="navContainer">
                <ul>
                    <li>
                        <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768056076/ajx_logo-Photoroom_1_mpqxkd.png"
                        className="logo"/>

                    </li>
                </ul>
                <ul>
                    <li> <p>Home</p></li>
                    <li> <p>Products</p> </li>
                    <li> <p>Cart</p> </li>
                    <li> 
                        <button> Logout </button>
                    </li>
                </ul>

            </div>
            
        </nav>
        
        
    )
}

export default Navbar