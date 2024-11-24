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

const drawerWidth = 240;
const navItems = [{text:'How it works'}, {text:'Explore'}, {text:'Get Started', path: '/signup'}];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={()=>navigate(item.path)} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: "0px", paddingBottom: "0px"}} className='what'>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, height: "40px",display: { xs: 'none', sm: 'block', md:"flex" }, alignItems: "center"}}>
           <Typography
            variant="h6"
            component="div"
            style={{marginRight: "90px", fontWeight: "bold"}}
          >
            EVENTINGS
          </Typography>
          {/* <input type="text" placeholder='search' style={{borderStyle:"none", borderRadius:"7px", width: "250px", height:"40px", outline:"none" , borderStyle: "none", textAlign:"center"}}/> */}
           </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', md:"flex" }, alignItems: "center"}}>
          <button style={{marginRight:"15px", borderRadius: "0px", backgroundColor:"#FD7100", color: "white", fontSize: "small", fontWeight: "bold", height: "40px"}}>BROWSE EVENTS</button>
            {navItems.map((item) => (
              <Button onClick={()=>navigate(item.path)} key={item.text} sx={{ color: '#fff', width:"150px"}}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
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
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
        </Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;