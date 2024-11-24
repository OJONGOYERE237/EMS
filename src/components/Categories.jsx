import React from 'react'
import CategoryCard from './CategoryCard'
import EducationalEvents from '../Assets/images/EducationalEvents.jpg'
import EducationalEvent1 from '../Assets/images/easyevents.jpg'
import EducationalEvent2 from '../Assets/images/GainSkillsEvents.avif'
import EducationalEvent3 from '../Assets/images/Background6.jpg'
import EducationalEvent4 from '../Assets/images/GainSkillsEvents.avif'


const Categories = () => {
    return (
        <div>
            <p style={{ padding: " 70px", paddingBottom: "10px", fontSize: "30px", fontWeight: "bold" }}>What You're Looking for</p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
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
                    categoryContentii="Gain Skills"
                    image={EducationalEvent2}
                />
                <CategoryCard
                    categoryContenti="Find events"
                    categoryContentii="Based On Location"
                    image={EducationalEvent3}
                />
            </div>
        </div>
    )
}

export default Categories