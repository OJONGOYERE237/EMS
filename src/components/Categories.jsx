import React from 'react'
import CategoryCard from './CategoryCard'
import EducationalEvents from '../Assets/images/EducationalEvents.jpg'
import EducationalEvent1 from '../Assets/images/easyevents.jpg'
import EducationalEvent2 from '../Assets/images/GainSkillsEvents.avif'
import EducationalEvent3 from '../Assets/images/Background6.jpg'
import EducationalEvent4 from '../Assets/images/GainSkillsEvents.avif'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



const Categories = () => {
    
    return (
        <div>
            <p style={{ padding:" 70px", paddingBottom: "5px", paddingLeft:"80px", fontSize: "30px", fontWeight: "bold" }}>What You're Looking for</p>
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft:'80px', paddingRight:'80px', paddingBottom:"20px" }}>
                <CategoryCard
                    categoryContenti="Aim to know more with"
                    categoryContentii="Educational Events"
                    image={EducationalEvents}
                />
                <CategoryCard
                    categoryContenti="Make better decisions in business"
                    categoryContentii="Business Events"
                    image={EducationalEvent1}
                />
                <CategoryCard
                    categoryContenti="Where knowledge meets practice"
                    categoryContentii="Tech & Innovation"
                    image={EducationalEvent2}
                />
                <CategoryCard
                    categoryContenti="Find events"
                    categoryContentii="Health & Wellness"
                    image={EducationalEvent3}
                />
                <CategoryCard
                    categoryContenti="Find events"
                    categoryContentii="Religious"
                    image={EducationalEvent4}
                />
            </div>
            <div className='allCategories'>
                <p style={{marginBottom:'0px'}}>ALL CATEGORIES</p>
                <NavigateNextIcon/>
            </div>
        </div>
    )
}

export default Categories
