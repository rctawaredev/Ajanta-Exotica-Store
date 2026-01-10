import './index.css'

const Login=()=> {
    return (
        <div className="Login-main-flex-cont">
            <div className="flex-row-cont">
                <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768049943/ajanta_exotica_store_jy7hbz.png"
                className="logo-bg"/>
                <div className="form-container">
                    <img src="https://res.cloudinary.com/distnojxb/image/upload/v1768049937/ajanta_exotica_store_logo_l90aul.png"
                        className="logo-login"
                    />
                    <form className="form">
                        <label htmlFor='username'>USERNAME</label>
                        <div className="inputBox">
                            <input 
                                type="text" 
                                id="username"
                                placeholder="Username"
                            />
                        </div>
                        <br/>
                        <label htmlFor='password'>PASSWORD</label>
                        <div className="inputBox">
                            <input 
                                type="password" 
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        
                        <br/>
                    </form>
                     <button>Login</button>
                </div>

               
                



            </div>

        </div>
    )
}


export default Login