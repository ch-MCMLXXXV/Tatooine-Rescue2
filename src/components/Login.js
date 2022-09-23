import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { CssBaseline, Typography } from '@mui/material';
import { BASE_URL } from '../frontend-api/index';
// import { loginUser } from '../frontend-api';

async function userLogin(username, password) {
   console.log(username, password);
   return fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         user: {
            username: username,
            password: password,
         },
      }),
   })
      .then((response) => response.json())
      .then((result) => {
         console.log(result);
         return result.data.token;
      })
      .catch(console.error);
}

function Login({ setToken }) {
   const navigate = useHistory();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const handleSubmit = async (e) => {
      e.preventDefault();
      const token = await userLogin(username, password);
      console.log(token);
      localStorage.setItem('token', token);
      setToken(token);
      navigate.push('/Home');
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
            </Box>
         </Box>
      </Container>
   );
}

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
