import React from 'react'
import HeroCard from './HeroCard'
import SearchComponent from './SearchComponent'
import "../Styles/hero.css"
const Hero = ({supportLineOne, supportLineTwo }) => {
    return (
            <div className='paragraph-container'>
                <p className='heading-text' >
                    {supportLineOne}
                </p>
                <p style={{fontSize:"20px", marginBottom:"70px"}}>
                     {supportLineTwo}
                </p>
                <div className='wholeHeroSection'>
                    <HeroCard cardContent = " Create your first event for free"  />
                    <HeroCard cardContent = " Easily manage your events with organizations"/>
                    <HeroCard cardContent = " Easily manage your events with organizations"/>
                    <HeroCard cardContent = " Easily manage your events with organizations"/>
                </div>
                <SearchComponent/>
            </div>
            
    )
}

export default Hero
