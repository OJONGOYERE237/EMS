import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import '../Styles/searchComponent.css' 

const SearchComponent = () => {
    const [searchText, setSearchText] = useState ("") 
    return (
        <div className='searchComponent'>
            <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} type="text" placeholder='Search Events' className='searchInput' />
            <span onClick={(e)=>{setSearchText("")}} style={{display: searchText? 'flex': 'none', alignItems:'center'}}>
                <CloseIcon />
            </span>
            <span className='searchIcon'>
                <SearchIcon />
            </span>
        </div>
    )
}

export default SearchComponent
