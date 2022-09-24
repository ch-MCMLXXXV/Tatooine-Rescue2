import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../frontend-api';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { CssBaseline, Typography, Grid, Link } from '@mui/material';
import { BASE_URL } from '../frontend-api/index';
// import { loginUser } from '../frontend-api';

const Login = ({
   username,
   setUsername,
   password,
   setPassword,
   setToken,
   setIsLoggedIn,
}) => {
   const [loginError, setLoginError] = useState('');
   const navigate = useHistory();
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username || !password) {
         return;
      }
      const data = await loginUser({
         username,
         password,
      });
      console.log({ data, line: 50 });
      const token = data.token;
      if (!token) {
         setLoginError(data.message);
         return;
      }
      localStorage.setItem('token', JSON.stringify(token));
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      if (token) {
         navigate.push('/Home');
      }
   };

   return (
      <Container component='main' maxWidth='xs'>
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}>
            <Typography component='h1' variant='h4'>
               Login
            </Typography>
            <Box component='form' onSubmit={handleSubmit}>
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='outlined'
                  label='Enter Username'
                  value={username}
                  onChange={(e) =>
                     setUsername(e.target.value)
                  }></TextField>
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='outlined-required'
                  label='Password'
                  type='password'
                  value={password}
                  onChange={(e) =>
                     setPassword(e.target.value)
                  }></TextField>
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}>
                  Login
               </Button>
               <Grid container>
                  <Grid>
                     <Link href='/Register' variant='body2'>
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
            {loginError && <p>{loginError}</p>}
         </Box>
      </Container>
   );
};

export default Login;

// const Login = ({
//     username,
//     setUsername,
//     password,
//     setPassword,
//     setToken,
//     setIsLoggedIn,
// }) => {
//     const navigate = useHistory();

//     const handleSubmit = async (event) => {
//         event.preventDefault()

//         const data = await loginUser({
//             username,
//             password,
//         });

//         if (data) {
//             setIsLoggedIn(true);
//             const token = data.token;
//             setToken(token);

//             alert(`${data.message}`);
//             navigate("/home")
//         } else {
//             alert(`${data.message}`);
//         }
//     };

//     return (

//         <form className="form" onSubmit={(handleSubmit)}>
//             <div>
//                 <h2>Log In</h2>
//                     <label>
//                         <p>Username</p>
//                         <input
//                             type="text"
//                             onChange={(event) => setUsername(event.target.value)}
//                             minLength="8"
//                             required
//                         />
//                     </label>
//                     <label>
//                         <p>Password</p>
//                         <input
//                             type="text"
//                             onChange={(event) => setPassword(event.target.value)}
//                             minLength="8"
//                             required
//                         />
//                     </label>
//                     <div>
//                         <button type="submit">Submit</button>
//                     </div>
//             </div>
//         </form>

//     );
// };
