import * as React from 'react';
import '../../Styles/dashboard.css'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserContext } from '../../context/userContext';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;


function Layout(props) {
  const { state: { user: { username, id } } } = useUserContext()
  const location = useLocation()
  const appHeaders = [
    {
      pathname: "/auth",
      appHeader: "Dashboard"
    },
    {
      pathname: "/auth/createEventPage",
      appHeader: "Create Event"
    },
    {
      pathname: "/auth/events/my-events",
      appHeader: "My Events"
    },
    {
      pathname: "/auth/events/attending",
      appHeader: "Attending"
    },
    {
      pathname: "/profilePage",
      appHeader: "User profile"
    }
  ]
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  //the state that controls the openning and closing of the events modal
  const [eventsOpen, setEventsOpen] = React.useState(false);
  const [organizationsOpen, setOrganizationsOpen] = React.useState(true);


  const handleEventsListClick = () => {
    setEventsOpen(!eventsOpen);
  };
  const handleOrgsListClick = () => {
    setOrganizationsOpen(!organizationsOpen);
  };


  const drawerItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/auth"
    },
    {
      text: "Create Event",
      icon: <EventSeatIcon />,
      path: "/auth/createEventPage",
    },
    {
      text: "Events",
      icon: <EventIcon />,
      openState: eventsOpen,
      openFunc: handleEventsListClick,
      subList: [
        {
          text: "My Events",
          icon: <ContactsIcon sx={{ fontSize: "18px" }} />,
          path: '/auth/events/my-events'
        },
        {
          text: "Attending",
          icon: <ViewListIcon sx={{ fontSize: "18px" }} />,
          path: '/auth/events/my-events'
        }
      ]
    },
    {
      text: "Organisations",
      icon: <GroupsIcon />,
      path: "/auth/organizations",
      // openState: organizationsOpen,
      // openFunc: handleOrgsListClick,
      // subList: [
      //   {
      //     text: "Organizations",
      //     icon: <ContactsIcon sx={{fontSize:"18px"}} />,
      //     path: '/events/my-events'
      //   },
      //   {
      //     text: "Following",
      //     icon: <EventSeatIcon  sx={{fontSize:"18px"}}/>,
      //     path: "/dashboard",
      //   }
      // ]

    },
    {
      text: "Exit To App",
      icon: <ExitToAppIcon />,
      path: "/landing"
    },
    {
      text: "logout",
      icon: <LogoutIcon/>,
      path: "/landing"

    }

  ]

  const navigate = useNavigate()
  const drawer = (
    <div>
      <div className='dashboardProfile' onClick={() => navigate ('/profilePage')}>
        <AccountCircleIcon 
          onClick = {() => navigate ('/profilePage')}
          // sx={{
          //   "&:hover": {
          //     cursor: "pointer",
          //     backgroundColor:'#e8f0fe',
          //     borderRadius: '50%',
          //     padding: '10px'
          //   }
              
          // }}
        />
        <p className='dashboardName'>{username}</p>
      </div>
      {/* <Toolbar /> */}
      {/* <Toolbar></Toolbar> */}
      {/* <Divider /> */}
      <List>
        {drawerItems.map(({ text, icon, path, subList, openState, openFunc }, index) => (
          <ListItem key={text}>
            {!subList ?
              <ListItemButton sx={{ borderRadius: "7px", padding: '0px 10px' }} onClick={() => { navigate(path) }}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton> :
              <Box sx={{ width: "100%" }}>
                <ListItemButton onClick={openFunc} sx={{ borderRadius: "7px", padding: '0px 10px' }}>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {openState ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openState} timeout="auto" unmountOnExit>
                  <List sx={{ paddingLeft: '20px' }} component="div" disablePadding>
                    {subList.map(({ text, icon, path }) => (
                      <ListItemButton key={text} sx={{ my: '15px', borderRadius: "7px", padding: '0px 10px' }} onClick={() => { navigate(path) }}>
                        <ListItemIcon>
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            }
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {drawerItems.map(({text, icon, path}, index) => (
          <ListItem key={text}>
            <ListItemButton  sx={{borderRadius: "10px", padding: '0px 10px'}} onClick={() => {navigate(path)}}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          padding: '0px'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {appHeaders.find((header) => header.pathname == location.pathname)?.appHeader}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}



export default Layout;
