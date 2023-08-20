import { useState, useEffect } from 'react'
import { createRequest } from '../../../../services/FetchBuidler';
import { Link } from 'react-router-dom';

const ProductsList = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        createRequest.fetch("products/all").then(res => {
            if (res?.length) {
                setProducts(res);
            } else {
                setProducts([])
            }
        }).catch(error => {
            console.error(error?.message);
            setProducts([]);
        })
    }, [])

    return (
        <div className='col-list'>
            {
                !products && <div>
                    Loading...
                </div>
            }
            {
                products && !products.length && <div>
                    <p><b> No Products Found </b></p>
                    <p> Add New Products </p>
                </div>
            }
            {
                products && !!products.length && <div className='list-items'>
                    <div className='wrapper'>
                        <ul>
                            {
                                products.map(prod => (
                                    <li key={prod.id}>
                                        <div  >
                                            <h2>
                                                <Link className='btn-link link' to={prod.id}> {prod.title} </Link>
                                            </h2>
                                            <p> {prod.description} </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductsList
