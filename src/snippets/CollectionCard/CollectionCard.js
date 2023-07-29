import React from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'


const CollectionCard = ({ collectionItem }) => {

    if (!collectionItem) {
        return null;
    }

    return (
        <Link className='collection-card btn-link' to={`/collections/${collectionItem?._id}`}>
            <div>
                <p> {collectionItem?._id} </p>
                <p> {collectionItem?.title} </p>
            </div>
        </Link>
    )
}

export default CollectionCard
