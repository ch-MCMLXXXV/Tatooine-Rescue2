import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import {
   CardActions,
   IconButton,
   CardActionArea,
} from '@mui/material';

const Home = ({ products, setproducts, setproductsToDisplay }) => {
   useEffect(() => {
      const fetchAllproducts = async () => {
         const response = await fetch(URL, {
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const result = await response.json();
         setproducts(result.data.products);
         setproductsToDisplay(result.data.products);
      };
      fetchAllproducts();
   });

   return (
      <>
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((product) => (
               <Grid key={product.id} item xs={12} md={6} sm={4}>
                  <Card
                     variant='outlined'
                     sx={{
                        display: 'flex',
                        backgroundColor: 'aliceblue',
                        boxShadow: '5px 5px grey',
                     }}>
                     <CardActionArea>
                        <CardMedia
                           component='img'
                           height='140'
                           image={product.image}
                           alt='Dog image'
                        />
                        <CardContent
                           sx={{ flex: 1 }}
                           key={product.id}>
                           <Typography component='h2' variant='h5'>
                              {product.name}
                           </Typography>
                           <Typography variant='subtitle1'>
                              {product.breed}
                           </Typography>
                           <Typography variant='subtitle2'>
                              {product.description},
                              {product.adoption_fee}
                           </Typography>
                        </CardContent>
                     </CardActionArea>
                     <CardActions>
                        {/* {token ? (
                           <IconButton
                              aria-label='message'
                              size='small'
                              href='/Message'>
                              <MessageIcon />
                           </IconButton>
                        ) : null} */}
                     </CardActions>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </>

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
   );
};

export default Home;
