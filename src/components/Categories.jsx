import React from 'react'
import CategoryCard from './CategoryCard'
import EducationalEvents from '../Assets/images/EducationalEvents.jpg'
import EducationalEvent1 from '../Assets/images/easyevents.jpg'
import EducationalEvent2 from '../Assets/images/GainSkillsEvents.avif'
import EducationalEvent3 from '../Assets/images/Background6.jpg'
import EducationalEvent4 from '../Assets/images/GainSkillsEvents.avif'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../Styles/Categories.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


const Categories = () => {
    const categories = [
        "Business", "Educational", "Corporate", "Cultural", "Comedy", "Tech & Innovation", "Health & Wellness", "Sports", "Religious", "Community & Social Impact", "Agriculture & Environment"
    ];

    const CategoryCarousel = [
        {
            categoryContenti: "Expand your business acumen with",
            categoryContentii: "Business Events",
            image: EducationalEvents,
            category: categories[0]
        },
        {
            categoryContenti: "Enhance your knowledge through",
            categoryContentii: "Educational Events",
            image: EducationalEvent1,
            category: categories[1]
        },
        {
            categoryContenti: "Network and grow with",
            categoryContentii: "Corporate Events",
            image: EducationalEvent2,
            category: categories[2]
        },
        {
            categoryContenti: "Celebrate diversity at",
            categoryContentii: "Cultural Events",
            image: EducationalEvent3,
            category: categories[3]
        },
        {
            categoryContenti: "Laugh out loud with",
            categoryContentii: "Comedy Shows",
            image: EducationalEvent4,
            category: categories[4]
        }, 
        {
            categoryContenti: "Discover the future at",
            categoryContentii: "Tech & Innovation Events",
            image: EducationalEvent4,
            category: categories[5]
        }, 
        {
            categoryContenti: "Promote well-being at",
            categoryContentii: "Health & Wellness Events",
            image: EducationalEvent4,
            category: categories[6]
        },
        {
            categoryContenti: "Get active with",
            categoryContentii: "Sports Events",
            image: EducationalEvent4,
            category: categories[7]
        },
        {
            categoryContenti: "Find spiritual growth at",
            categoryContentii: "Religious Events",
            image: EducationalEvent4,
            category: categories[8]
        }, 
        {
            categoryContenti: "Make a difference with",
            categoryContentii: "Community & Social Impact Events",
            image: EducationalEvent4,
            category: categories[9]
        },
        {
            categoryContenti: "Support sustainability at",
            categoryContentii: "Agriculture & Environment Events",
            image: EducationalEvent4,
            category: categories[10]
        },
    ]

    return (
        <div>
            <p style={{ padding: " 70px", paddingBottom: "5px", paddingLeft: "80px", fontSize: "30px", fontWeight: "bold" }}>What You're Looking for</p>
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: '80px', paddingRight: '80px', paddingBottom: "20px", }}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={5}
                    navigation
                    pagination = {{clickable: true}}
                    scrollbar={{draggable: true}}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    // style={{ marginTop: '70px', '--swiper-pagination-bullet-bottom': '50px'}}
                    
                >
                    {CategoryCarousel.map((item, index) => (
                        <SwiperSlide key={index} >
                            <CategoryCard
                                categoryContenti={item.categoryContenti}
                                categoryContentii={item.categoryContentii} 
                                image={item.image}
                                category={item.category}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            <div className='allCategories'>
                <p style={{ marginBottom: '0px' }}>ALL CATEGORIES</p>
                <NavigateNextIcon />
            </div>
        </div>
    )
}

export default Categories
