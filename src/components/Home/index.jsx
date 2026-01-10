import Navbar from '../Navbar'
import './index.css'

const Home=()=> {
    return(
        <div className="HomeContainer">
            <Navbar/>
            <div className="HomeBody">
                <div className="homeBodyFlexCont">
                    <div className="homeTextCont">
                        <h1 className="home-head">Your Everyday Fashion Store</h1>
                        <br/>
                        <p className="home-para">
                            Style isn’t just something you wear — it’s
                            how you express yourself without saying a word.
                            Every outfit tells a story and reflects your personality.
                            Trends may change, but your signature look is what truly sets you apart. 
                            Discover new collections each season and define your own style.
                        </p>
                         <button className="shopNowBtn"> Shop Now</button>
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768057769/image3_wfjldv.png" 
                            className="homeBodyImg"
                        />
                    </div>
                </div>

            </div>
        </div>
        
        
        
            
            

       
        

       
    )
}

export default Home

