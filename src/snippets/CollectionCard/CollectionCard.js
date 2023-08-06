import React from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'


const CollectionCard = ({ collectionItem }) => {

    if (!collectionItem) {
        return null;
    }

    return (
        <Link className='collection-card btn-link' to={`/collections/${collectionItem?.id}`}>
            <div>
                <p> {collectionItem?.id} </p>
                <p> {collectionItem?.title} </p>
            </div>
        </Link>
    )
}

export default CollectionCard
