import "./CartDetails.css"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import CartItem from "../../snippets/Cart/CartItem";

const CartDetails = () => {

    const login = useSelector(state => state.login);
    const cart = useSelector(state => state.cart);

    return (
        <div className="cart-details">
            {
                !login.isLoggedIn && <p>
                    Please <Link to="/login"> login</Link> to add items to
                    cart
                </p>
            }
            {
                login.isLoggedIn && !cart && <p> error while fetching cart , please contact administrator </p>
            }
            {
                login.isLoggedIn && cart && !cart.items?.length && <p> No items in your cart </p>
            }
            {
                login.isLoggedIn && cart && !!cart.items?.length &&
                <div className="cart-container">
                    <div className="cart-Items-wrapper">
                        {
                            cart.items.map(item => (
                                <CartItem key={`cart-item-${item.productId}`} item={item} />
                            ))
                        }
                    </div>
                    <hr />
                    <div className="cart-footer">
                        <div>
                            <label> Total price - Rs. {cart.price}</label>
                        </div>
                        <div className="checkout">
                            <button disabled> Checkout </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CartDetails
