import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const drawerWidth = 240;


function Navbar(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { state: { isAuthenticated } } = useAuth()

  const navItems = [
    { text: 'How it works', },
    { text: 'Explore' },
    { text: isAuthenticated ? 'Go to Console' : 'Get Started', path: '/signUpUpdate' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const navigate = useNavigate()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ color: 'black' }}>
            <ListItemButton onClick={() => navigate(item.path)} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} sx={{ color: 'black' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <Box sx={{ display: 'flex', marginBottom: "0px", paddingBottom: "0px" }} className='what'>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: 'white', }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, height: "40px", display: { xs: 'none', sm: 'block', md: "flex" }, alignItems: "center" }}>
            <Typography
            onClick={() => navigate('/landing')}
              variant="h6"
              component="div"
              style={{
                marginRight: "90px",
                fontWeight: "bold",
                color: '#f05537',
                // fontFamily: "Neue Plak Text, Neue Plak",
                fontSize: '25px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              EVENTINGS
            </Typography>
            {/* <input type="text" placeholder='search' style={{borderStyle:"none", borderRadius:"7px", width: "250px", height:"40px", outline:"none" , borderStyle: "none", textAlign:"center"}}/> */}
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', md: "flex" }, alignItems: "center" }}>
            <Button className='browseEventsButton'
              sx={{
                borderRadius: "0px",
                height: "40px",
                border: 'none',
                padding: '5px',
                color: 'black',
                width: "130px",
                backgroundColor: "white",
                // fontFamily: "Neue Plak Text, Neue Plak",
                fontSize: '14px',
                border: "1px solid #f05537",
                // lineHeight: index == navItems.length - 1 ? "1rem" : "1rem",
                '&:hover': {
                  color: '#f05537',
                  border: "1px solid #f05537",
                }
              }}
              // variant= 'contained'
              onClick={() => navigate('/browseeventpage/all')}

            >BROWSE EVENTS</Button>
            {navItems.map((item, index) => (
              <Button
                onClick={() => navigate(item.path)} key={item.text}
                sx={
                  index == navItems.length - 1 ? {
                    marginRight: "15px",
                    borderRadius: "0px",
                    backgroundColor: "#f05537",
                    color: "white",
                    height: "40px",
                    // fontFamily: "Neue Plak Text, Neue Plak",
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    padding: '10px'
                  } : {
                    marginRight: "15px",
                    borderRadius: "0px",
                    height: "40px",
                    border: 'none',
                    padding: '10px',
                    color: 'black',
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#f05537',
                    }
                  }}
                variant={index == navItems.length - 1 ? "outlined" : "text"}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ width: '100%' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}


export default Navbar;


