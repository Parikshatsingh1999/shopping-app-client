import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"
import logo from "../../assets/logo.jpg"


const Header = () => {

    const isUserLogged = sessionStorage.getItem("userLogged") === "true" || false;
    const navigate = useNavigate();
    const logoutUser = () => {
        sessionStorage.setItem("userLogged", false)
        navigate("/");
    }

    return (
        <header className="app-header full-width">
            <h3>
                <Link to="/" className='btn-link'> Shopping Stop
                </Link>
            </h3>
            <div className='header-content'>
                <div className='logo-img'>
                    <img src={logo} alt='Logo' />
                </div>
                <div className='search-box'>
                    <label htmlFor="search-input"> Search </label>
                    <input id="search-input" aria-label='search' placeholder='Search' />
                </div>
                <div className='icon-box'>

                    <div className='login-box'>
                        {!isUserLogged && <Link to="/login" className='btn-link'>Login</Link>}
                        {isUserLogged && <p onClick={logoutUser} className='btn-link'>LogOut</p>}
                    </div>

                    <div className='cart-box'>
                        <p> Cart </p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
