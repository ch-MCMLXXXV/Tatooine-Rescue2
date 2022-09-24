import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
   Typography,
   AppBar,
   Box,
   Toolbar,
   Button,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import Search from "./Search";
// import Userpage from './Userpage';

const NavBar = ({ token }) => {
   const navigate = useHistory();
   const [anchorEl, setAnchorEl] = useState(null);

   const handleMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const goHome = () => {
      navigate.push('/Home');
   };

   const goCart = () => {
      navigate.push('/Cart');
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      navigate.push('/Home');
   };

   //    const handleOpenNavMenu = (event) => {
   //       setAnchorElNav(event.currentTarget);
   //    };

   //    const handleCloseNavMenu = () => {
   //       setAnchorElNav(null);
   //    };

   return (
      <>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
               <Toolbar>
                  <Typography
                     variant='h6'
                     component='div'
                     sx={{ flexGrow: 1 }}>
                     Tatooine Puppy Rescue!
                  </Typography>
                  {!token ? (
                     <>
                        <Button href='/Home' color='inherit'>
                           Home
                        </Button>
                        <Button href='/Register' color='inherit'>
                           Register
                        </Button>
                        <Button href='/Login' color='inherit'>
                           Login
                        </Button>
                     </>
                  ) : (
                     <>
                        <IconButton
                           size='large'
                           aria-controls='menu-appbar'
                           aria-haspopup='true'
                           onClick={handleMenu}
                           edge='start'>
                           <MenuIcon />
                        </IconButton>
                        <Menu
                           id='mouse-over-popover'
                           anchorEl={anchorEl}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                           }}
                           open={Boolean(anchorEl)}
                           onClose={handleClose}
                           MenuListProps={{
                              'aria-labelledby': 'basic-button',
                           }}>
                           <MenuItem onClick={goHome}>Home</MenuItem>
                           <MenuItem onClick={goCart}>Cart</MenuItem>
                           <MenuItem onClick={handleLogout}>
                              Logout
                           </MenuItem>
                        </Menu>

                        {/* <Menu
                           id='menu-appbar'
                           anchorEl={anchorElNav}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                           }}
                           open={Boolean(anchorElNav)}
                           onClose={handleCloseNavMenu}
                           sx={{
                              display: { xs: 'block', md: 'none' },
                           }}>
                           {pages.map((page) => (
                              <MenuItem
                                 key={page}
                                 onClick={handleCloseNavMenu}>
                                 <Typography textAlign='center'>
                                    {page}
                                 </Typography>
                              </MenuItem>
                           ))}
                        </Menu> */}
                        {/* <Button href='/Home' color='inherit'>
                           Home
                        </Button>
                        <Button href='/Register' color='inherit'>
                           Register
                        </Button>
                        <Button href='/Login' color='inherit'>
                           Login
                        </Button>
                        <Button href='/Logout' color='inherit'>
                           Logout
                        </Button> */}
                     </>
                  )}
               </Toolbar>
            </AppBar>
         </Box>
      </>
   );
};

export default NavBar;
