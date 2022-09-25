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
} from '@mui/material';

const Home = ({ products, setproducts }) => {
   const navigate = useHistory();
   const handleClick = async (e) => {
      e.preventDefault();
      navigate.push('/SingleProduct');
   };

   return (
      <>
         <Typography variant='h2' component='div'>
            Puppies For Adoption
         </Typography>
         <Grid
            container
            spacing={{ xs: 6 }}
            columns={{ xs: 4, sm: 12 }}>
            {products.map((product) => (
               <Grid key={product.id} item xs='auto' md={6} sm={4}>
                  <Card
                     variant='outlined'
                     sx={{
                        borderRadius: '16px',
                        backgroundColor: 'aliceblue',
                        boxShadow: '5px 5px grey',
                     }}>
                     <CardActionArea>
                        <CardMedia
                           component='img'
                           height='auto'
                           src={product.image}
                           onClick={handleClick}
                           alt='Dog image'
                        />
                        <CardContent key={product.id}>
                           <Typography component='h2' variant='h5'>
                              {product.name}
                           </Typography>
                           <Typography variant='subtitle1'>
                              Breed: {product.breed}
                           </Typography>
                           <Typography variant='subtitle1'>
                              Des:{product.description}
                           </Typography>
                           <Typography variant='subtitle1'>
                              Adoption fee: ${product.adoption_fee}
                           </Typography>
                        </CardContent>
                     </CardActionArea>
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
