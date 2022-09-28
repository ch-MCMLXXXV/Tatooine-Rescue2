import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import {
   CardActions,
   CardActionArea,
   Button,
} from '@mui/material';

const Home = () => {
   const navigate = useHistory();
   const handleClick = async (e) => {
      e.preventDefault();
      navigate.push('/products');
   };

   return (
      <>
         <Typography
            variant='h4'
            component='div'
            align='center'
            style={{ marginTop: '35px'}} >
            Welcome To Tatooine Puppy Rescue!
         </Typography>
         <CardMedia
            component='img'
            src="https://i.etsystatic.com/6511037/r/il/2dab7a/3059740452/il_1140xN.3059740452_7oda.jpg"
            alt='Dog image'
            style={{ marginLeft: 'auto',
                     marginRight: 'auto',
                     marginBottom: '40px',
                     marginTop: '40px',
                     width: 400,
                     height: 400,
                     borderRadius: '16px',
                     boxShadow: '5px 5px grey' }}
            />
         <Button
            type='submit'
            style={{margin: 'auto', display: "flex"}}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick = {handleClick}>
            Find your little Ewok here!
         </Button>
      </>
   );
};

export default Home;
