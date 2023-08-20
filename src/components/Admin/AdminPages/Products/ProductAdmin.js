import "./Product-Admin.css";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { createRequest } from '../../../../services/FetchBuidler';
import { alertMessage } from '../../../../helpers/alerts';

const ProductAdmin = () => {

    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const { productId } = useParams();

    useEffect(() => {
        if (!productId) {
            navigate("/admin");
            return;
        }
        const path = `products/${productId}`;
        createRequest.fetch(path).then((res) => {
            if (res && !res.error) {
                console.log("res", res)
                setProduct(res);
            } else if (res?.error) {
                alertMessage(
                    res.error || `Something went wrong while getting product info`
                );
                setProduct(false);
            }

        }).catch(error => {
            console.error("error.message");
            setProduct(false);
        });

    }, [productId, navigate]);

    return (
        <div>
            {
                product === null && <div> Loading... </div>
            }
            {
                product === false && <div>
                    <h3> Something went wrong. </h3>
                    <p> Please try again later. </p>
                </div>
            }
            {
                !!product &&
                <div>
                    <form className='prod-form'>
                        <div className='form-element'>
                            <label> Product Image: </label>
                            <div className='featured-image'> <img src={product.image} alt='featured-product' /> </div>
                        </div>
                        <div className='form-element'>
                            <label> Product Title: </label>
                            <input value={product.title} onChange={e => { }} />
                        </div>
                        <div className='form-element'>
                            <label> Product Description: </label>
                            <textarea rows="5" value={product.description} onChange={e => { }} />
                        </div>
                        <div className='form-element'>
                            <label> Product Curreny: </label>
                            <input value={product.currency} onChange={e => { }} />
                        </div>
                        <div className='form-element'>
                            <label> Product Price: </label>
                            <input type='number' value={product.price} onChange={e => { }} />
                        </div>
                    </form>
                </div>
            }

        </div>
    )
}

export default ProductAdmin
