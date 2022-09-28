import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import {
   CardActions,
   // IconButton,
   CardActionArea,
   Button,
} from '@mui/material';

const Home = ({ products, setProducts, productId }) => {
   const navigate = useHistory();
   const handleClick = async (e) => {
      e.preventDefault();
      // navigate.push('/products:productId');
      navigate.push(`/products/${productId}`);
   };

   return (
      // <>
      //    <Typography variant='h2' component='div'>
      //       Puppies For Adoption
      //    </Typography>
      //    <Grid
      //       container
      //       spacing={{ xs: 6 }}
      //       columns={{ xs: 4, sm: 12 }}>
      //       {products.map((product) => (
      //          <Grid key={product.id} item xs='auto' md={6} sm={4}>
      //             <Card
      //                variant='outlined'
      //                sx={{
      //                   borderRadius: '16px',
      //                   backgroundColor: 'aliceblue',
      //                   boxShadow: '5px 5px grey',
      //                }}>
      //                <CardActionArea>
      //                   <CardMedia
      //                      component='img'
      //                      height='auto'
      //                      src={product.image}
      //                      alt='Dog image'
      //                   />
      //                   <CardContent key={product.id}>
      //                      <Typography component='h2' variant='h5'>
      //                         {product.name}
      //                      </Typography>
      //                      <Typography variant='subtitle1'>
      //                         <strong>Breed: </strong> {product.breed}
      //                      </Typography>
      //                      <Typography variant='subtitle1'>
      //                         Des:{product.description}
      //                      </Typography>
      //                      <Typography variant='subtitle1'>
      //                         <strong>Adoption fee:</strong> $
      //                         {product.adoption_fee}
      //                      </Typography>
      //                   </CardContent>
      //                   <CardActions>
      //                      <Button
      //                         size='small'
      //                         color='primary'
      //                         href='/Products'>
      //                         Adopt a Dog
      //                      </Button>
      //                   </CardActions>
      //                </CardActionArea>
      //             </Card>
      //          </Grid>
      //       ))}
      //    </Grid>
      // </>

      // <div>
      // 	<header>
      // 		<h1>Home Page</h1>
      // 	</header>
      // 	<h2>products For Adoptions</h2>
      // 	{products.map((dog) => (
      // 		<div key={dog._id}>
      // 			<h3>{dog.name}</h3>
      // 			<div>{dog.description}</div>
      // 			<div>{dog.breed}</div>
      // 			<div>{dog.image}</div>
      // 			<div>{dog.adoption_fee}</div>
      // 		</div>
      // 	))}
      // </div>
      <>
         <Typography
            variant='h4'
            component='div'
            align='center'
            style={{ marginTop: '35px'}} >
            Welcome To Tatooine Puppy Rescue!
         </Typography>
         {/* <Typography variant='h3'>Find your little Ewok here!</h2> */}
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
            // border='2px solid black'
            />
         <Button
                  type='submit'
                  style={{margin: 'auto', display: "flex"}}
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}>
                  Find your little Ewok here!
               </Button>
      </>
   );
};

export default Home;
