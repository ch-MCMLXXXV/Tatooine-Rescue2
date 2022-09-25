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

const NavBar = ({ token, isLoggedIn, setIsLoggedIn, setToken }) => {
   const navigate = useHistory();
   const [anchorEl, setAnchorEl] = useState(null);
   const [open, setOpen] = useState(false);

   const openSnk = (e) => {
      if (handleLogout(e.target)) {
         setOpen(true);
      } else {
         setOpen(false);
      }
   };

   const handleMenu = (e) => {
      setAnchorEl(e.currentTarget);
      setOpen(true);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
   };
   const goHome = () => {
      navigate.push('/Home');
   };

   const goCart = () => {
      navigate.push('/Cart');
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setToken('');
      navigate.push('/Home');
      alert('You have been successfully logged out.');
   };

   return (
      <>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
               <Toolbar>
                  <Typography
                     variant='h4'
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
                           size='small'
                           aria-haspopup='true'
                           onMouseEnter={handleMenu}
                           edge='start'>
                           <MenuIcon style={{ color: '#FFE820' }} />
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
                           open={open}
                           onMouseLeave={handleClose}
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
                     </>
                  )}
               </Toolbar>
            </AppBar>
         </Box>
      </>
   );
};

export default NavBar;
