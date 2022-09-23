import * as React from 'react';
import { useState } from 'react';
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
   const pages = ['Home', 'Register', 'Login', 'Cart'];
   const [anchorElNav, setAnchorElNav] = useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

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
                        <IconButton>
                           <MenuIcon />
                        </IconButton>
                        <Menu
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
                        </Menu>
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
         <Typography variant='h2' component='div'>
            Tatooine products For Adoption
         </Typography>
      </>
   );
};

export default NavBar;
