import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"
import logo from "../../assets/logo.jpg"
import { useSelector, useDispatch } from 'react-redux';
import { setLogIn } from '../../store/login/loginSlice';
import { alertMessage } from '../../helpers/alerts';


const Header = () => {

    const login = useSelector(state => state.login);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        const data = {
            setLogin: false,
            token: ""
        }
        dispatch(setLogIn(data));
        alertMessage("You Logged Out");
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
                        {!login?.isLoggedIn && <Link to="/login" className='btn-link'>Login</Link>}
                        {login.isLoggedIn && <p onClick={logoutUser} className='btn-link'>LogOut</p>}
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
