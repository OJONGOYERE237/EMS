import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const searchPageSearchComponent = () => {
  return (
    <div>
      <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} type="text" placeholder='Search Events' />
            <span onClick={(e)=>{setSearchText("")}} style={{display: searchText? 'flex': 'none', alignItems:'center'}}>
                <CloseIcon />
            </span>
            <span className='searchIcon'>
                <SearchIcon />
            </span>
    </div>
  )
}

export default searchPageSearchComponent
