import React from 'react'
import "./HeroBanner.css";
import banner from "../../assets/banner.png"

const HeroBanner = () => {
    return (
        <div className='hero-banner full-width'>
            <img src={banner} alt='banner' />
        </div>
    )
}

export default HeroBanner
