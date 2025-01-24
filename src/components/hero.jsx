import React from 'react'
import HeroCard from './HeroCard'
import SearchComponent from './SearchComponent'
import "../Styles/hero.css"
import coverImage from '../Assets/images/youth-train-web-devt.jpg'

const Hero = (props) => {
    const { supportLineOne, supportLineTwo } = props
    return (
        <div
            className='paragraph-container'
            style={{
                position: 'relative',
                backgroundImage: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '70vh', padding: '20px'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1
            }}></div>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className='heading-text' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', width: 'fit-content', textAlign: 'center', borderRadius: '10px' }}>
                    {supportLineOne}
                </p>
                <p style={{ fontSize: "20px", marginBottom: "70px", color: "white", backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', width: 'fit-content', borderRadius: '8px'  }}>
                    {supportLineTwo}
                </p>
                <div className='wholeHeroSection'>
                    <HeroCard cardContent=" Create your first event for free" />
                    <HeroCard cardContent=" Easily manage your events with organizations" />
                    <HeroCard cardContent=" Easily manage your events with organizations" />
                    <HeroCard cardContent=" Easily manage your events with organizations" />
                </div>
                {/* <SearchComponent 
                    styles={{
                        borderRadius: '35px',
                        inputWidth: '310px',
                        iconButtonWidth: '82px',
                        boxWidth: '450px',
                        justifySelf: 'center'
                    }}
                /> */}
            </div>
        </div>
    )
}

export default Hero
