import { useState, useEffect } from 'react'
import "./Collection-List.css";
import { Link } from 'react-router-dom';
import { createRequest } from "../../../../services/FetchBuidler"

const CollectionList = () => {

    const [collections, setCollections] = useState(null);

    useEffect(() => {
        createRequest.fetch("collections").then(res => {
            if (res?.length) {
                setCollections(res);
            } else {
                setCollections([])
            }
        }).catch(error => {
            console.error(error?.message);
            setCollections([]);
        })
    }, [])

    return (
        <div className='col-list'>
            {
                !collections && <div>
                    Loading...
                </div>
            }
            {
                collections && !collections.length && <div>
                    <p><b> No collection Found </b></p>
                    <p> Add New Collection </p>
                </div>
            }
            {
                collections && collections.length &&
                <div className='list-items'>
                    <div className='wrapper'>
                        <ul>
                            {
                                collections.map(col => (
                                    <li key={col.id}>
                                        <div>
                                            <h2>
                                                <Link className='btn-link link' to={col.id}> {col.title} </Link>
                                            </h2>
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

export default CollectionList
