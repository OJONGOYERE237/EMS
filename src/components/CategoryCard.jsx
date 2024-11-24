import React from 'react'
import '../Styles/CardCategory.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({ categoryContenti, categoryContentii, image }) => {
  return (
    <div className="categoryCard" >
      <img src={image} alt="background Image" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius:"5px"}}/>
      <div className='overlaydiv'>
        <p className='categoryContenti'>{categoryContenti}</p>
        <p className='categoryContentii'><Link style={{ textDecoration: 'none', color: 'white' }}>{categoryContentii}</Link></p>
      </div>

    </div>
  )
}

export default CategoryCard