import React from 'react'
import HeroCard from './HeroCard'
import SearchComponent from './SearchComponent'
import "../Styles/hero.css"


const Hero = (props) => {
    const { supportLineOne, supportLineTwo } = props
    // const lineOne = props.supportLineOne
    return (
        <div className='paragraph-container'>
            <p className='heading-text' >
                {supportLineOne}
            </p>
            <p style={{ fontSize: "20px", marginBottom: "70px" }}>
                {supportLineTwo}
            </p>
            <div className='wholeHeroSection'>
                <HeroCard cardContent=" Create your first event for free" />
                <HeroCard cardContent=" Easily manage your events with organizations" />
                <HeroCard cardContent=" Easily manage your events with organizations" />
                <HeroCard cardContent=" Easily manage your events with organizations" />
            </div>
            <SearchComponent boxWidth={'450px'} borderRadius={'35px'} iconButtonWidth={'82px'} inputWidth={'310px'}/>
        </div>
    )
}

export default Hero
