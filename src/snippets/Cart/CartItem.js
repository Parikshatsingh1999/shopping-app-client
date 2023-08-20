import { useRef, useState } from 'react'
import { removeItemFromCart } from '../../store/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem } from '../../store/cart/cartSlice';

const CartItem = ({ item: cartItem = null }) => {

    const [quantity, setQuantity] = useState(cartItem.quantity);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const removeItem = () => {
        if (cartItem.productId) {
            dispatch(removeItemFromCart({ id: cartItem.productId }));
        }
    };

    const quantityRef = useRef();

    const updateCart = () => {
        let quan = Number(quantityRef.current.value) || 1;
        quan = quan > 0 ? quan : 1;
        dispatch(updateCartItem({ id: cartItem.productId, quantity: quan }))
    }

    if (!cartItem) {
        return <></>
    }

    return (
        <div className='cart-item'>
            <div className='item-wrapper'>
                <div>
                    <p> {cartItem.title} </p>
                    <label> Rs. {cartItem.price} </label>
                </div>
                <div className='quan-row'>
                    <input
                        disabled={cart.isUpdating}
                        ref={quantityRef}
                        type='number'
                        value={quantity}
                        onChange={(e) =>
                            e.target.value > 0 && (setQuantity(prev => e.target.value))
                        } />
                    {
                        cartItem.quantity !== Number(quantity) && <button disabled={cart.isUpdating} onClick={updateCart}> Update </button>
                    }
                </div>
                <div className='total-price'>
                    <label> Rs. {cartItem.price * (cartItem.quantity || 1)} </label>
                    <button disabled={cart.isUpdating} className='btn-link' onClick={removeItem}> Remove </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
