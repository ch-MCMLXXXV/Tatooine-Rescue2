import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteProduct } from '../frontend-api/index';
import Typography from '@mui/material/Typography';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
   IconButton,
   Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SingleProduct = ({ products, orders, token }) => {
	const username = localStorage.getItem('username');
	const { id } = useParams();
	const productId = id;
	const product = products.find((product) => product.id == id);
	if (product === undefined) {
		return null;
	}
	const { name, description, breed, image, adoption_fee } = product;

	

   return (
      <>
         <Grid sx={{ mb: 5, mt: 4 }}>
            <Typography
               component='h2'
               variant='h2'
               style={{ textAlign: 'center' }}>
               {product.name}
            </Typography>
         </Grid>
         <Grid
            container
            direction='row'
            justifyContent={'space-around'}
            alignItems='center'>
            <Paper
               elevation={5}
               component='img'
               height='500px'
               src={product.image}
               alt='Dog Image'></Paper>
            <Grid item xs={3} md={4}>
               <Grid item xs={4} md={4} sx={{ mb: 2 }}>
                  <Typography variant='h3'>
                     {product.breed}
                  </Typography>
               </Grid>
               <Grid item xs='auto' rowSpacing={2} sx={{ mb: 2 }}>
                  <Typography variant='h5'>
                     {product.description}
                  </Typography>
               </Grid>
               <Grid item xs={6} md={4}>
                  <Typography variant='h6'>
                     Fee: ${adoption_fee}
                  </Typography>
                  <Tooltip title='Add to Cart'>
                     <IconButton
                        aria-label='Add to Cart'
                        href='/Cart'>
                        <AddShoppingCartSharpIcon fontSize='large' />
                     </IconButton>
                  </Tooltip>
				  {(username === "Admin1") ? (
					<div>
					<Tooltip title='Edit'>
						<IconButton
							aria-label='Edit'
							href={'/edit/' + id}>
							<EditIcon fontSize='large' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton
							aria-label='Delete'
							type='sumbit'
							onClick={() => deleteProduct({token, productId})} >
							<DeleteIcon fontSize='large' />
						</IconButton>
					</Tooltip>
					</div>) : null}
               </Grid>
            </Grid>
         </Grid>
      </>
   );
};

export default SingleProduct;
