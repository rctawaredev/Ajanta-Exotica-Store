import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Navigate} from 'react-router-dom'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      navigate('/', {replace: true})
    } else {
      setShowError(true)
      setErrorMsg(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="Login-main-flex-cont">
      <div className="flex-row-cont">
        <img
          src="https://res.cloudinary.com/distnojxb/image/upload/v1768049943/ajanta_exotica_store_jy7hbz.png"
          className="logo-bg"
        />
        <div className="form-container">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1768049937/ajanta_exotica_store_logo_l90aul.png"
            className="logo-login"
          />
          <form className="form" onSubmit={submitForm}>
            <label htmlFor="username">USERNAME</label>
            <div className="inputBox">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <br />
            <label htmlFor="password">PASSWORD</label>
            <div className="inputBox">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <br />
            {showError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login