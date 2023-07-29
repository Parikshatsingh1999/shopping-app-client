import React from 'react'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import CollectionList from '../components/CollectionList/CollectionList'

const Home = () => {
    return (
        <div className='home-page'>
            <HeroBanner />
            <CollectionList />
        </div>
    )
}

export default Home
