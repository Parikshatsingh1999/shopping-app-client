import { useEffect } from 'react'
import { Link, } from 'react-router-dom'
import "./Header.css"
import logo from "../../assets/logo.jpg"
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/login/loginSlice';
import { fetchCart } from '../../store/cart/cartSlice';



const Header = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchCart()).then(res => {
            if (res?.payload?.error === "User not authenticated") {
                dispatch(logOut());
            }
        })
    }, [login.token, dispatch])

    const logoutUser = () => {
        dispatch(logOut());
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
                        <Link to="/cart" className='btn-link'> Cart {!!cart.count && <span> {cart.price} - ( {cart.count} ) </span>} </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
