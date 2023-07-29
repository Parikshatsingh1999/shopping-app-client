import React, { useEffect, useState } from 'react'
import "./CollectionList.css"
import { FetchBuilder } from '../../services/FetchBuidler'
import CollectionCard from '../../snippets/CollectionCard/CollectionCard';

const CollectionList = () => {

    const [list, setList] = useState([]);
    const [error, SetError] = useState(false);

    useEffect(() => {
        try {
            FetchBuilder().then(res => {
                if (res) {
                    setList(res);
                } else {
                    SetError(true)
                }
            }).catch(err => {
                SetError(true)
            })
        } catch (error) {
            SetError(true)
        }
    }, [])

    return (
        <div className='col-container'>
            <h3 className='heading'>Collection List</h3>
            <div className='collection-list'>

                {
                    !!error && <p> Something went Wrong</p>
                }
                {
                    !error && !!list.length && (
                        list.map(item => (
                            <CollectionCard key={item._id} collectionItem={item} />
                        ))

                    )
                }
            </div>
        </div>
    )
}

export default CollectionList
