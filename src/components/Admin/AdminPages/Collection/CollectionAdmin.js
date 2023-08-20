import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { createRequest } from '../../../../services/FetchBuidler';
import { Link } from 'react-router-dom';

const AdminCollection = () => {
    const navigate = useNavigate();
    const { collectionId } = useParams();

    const [collection, setCollection] = useState(null);

    useEffect(() => {
        if (!collectionId) {
            navigate("/admin");
            return;
        }
        const path = `collections/${collectionId}`;
        createRequest.fetch(path).then((res) => {
            if (!res.error) {
                setCollection(res);
            } else {
                setCollection(false)
            }
        }).catch(error => {
            console.error(error.message);
            setCollection(false)
        });
    }, [collectionId, navigate])


    return (
        <div>
            {
                collection === null && <div>
                    <p> Loading... </p>
                </div>
            }
            {
                collection === false && <div>
                    Something went wrong, Please try again later
                </div>
            }
            {
                !!collection && <div>
                    <div className='collection-form'>
                        <form>
                            <div className='form-element'>
                                <label> Collection Title: </label>
                                <input value={collection.title} onChange={e => { }} />
                            </div>
                            <div className='form-element'>
                                <label> Collection Description: </label>
                                <textarea rows="5" value={collection.description} onChange={e => { }} />
                            </div>
                            <div className='form-element'>
                                <label> Collection Products: </label>
                                {
                                    !!collection.products?.length &&
                                    <div className='prods-list'>
                                        <ul>
                                            {
                                                collection.products.map(prod => (
                                                    <li key={prod.id}>
                                                        <Link className='btn-link link' to={`/admin/products/${prod.id}`}> {prod.title} </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    !collection.products?.length &&
                                    <div>
                                        <h3> Collection has no products </h3>
                                        <p> Add Products to collection </p>
                                    </div>
                                }

                            </div>
                        </form>
                    </div>
                </div >
            }
        </div >
    )
}

export default AdminCollection
