import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ styles, searchText, setSearchText }) => {
    const { borderRadius, inputWidth, iconButtonWidth, boxWidth, buttonIsHalf, justifySelf } = styles;

    const searchInputStyles = {
        padding: '10px 20px',
        borderStyle: 'none',
        outline: 'none',
        width: inputWidth,
    };

    const searchIcon = {
        color: 'white'
    };

    const searchButtonStyle = {
        backgroundColor: '#cc3f24',
        height: '72px',
        width: iconButtonWidth,
        position: 'absolute',
        right: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(buttonIsHalf) ? {
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius
        } : {
            borderRadius
        }
    };

    const searchComponentStyles = {
        backgroundColor: "white",
        marginTop: "40px",
        height: "72px",
        width: boxWidth,
        display: "flex",
        justifyContent: "flex-start",
        position: "relative",
        alignItems: 'center',
        gap: "10px",
        borderRadius,
        justifySelf,
        paddingLeft: '10px',
        border: "1px solid #cc3f24",
    };

    return (
        <div className='searchComponent' style={searchComponentStyles}>
            <input value={searchText} onChange={(e) => { setSearchText(e.target.value) }} type="text" placeholder='Search Events' className='searchInput' style={searchInputStyles} />
            <span onClick={(e) => { setSearchText("") }} style={{ display: searchText ? 'flex' : 'none', alignItems: 'center' }}>
                <CloseIcon />
            </span>
            <span className='searchIcon' style={searchButtonStyle}>
                <SearchIcon sx={searchIcon} />
            </span>
        </div>
    );
};

export default SearchComponent;
