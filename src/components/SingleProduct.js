import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, addProduct } from '../frontend-api/index';
import Products from './Products';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@material-ui/core';
import { CardActions, CardActionArea } from '@mui/material';

const SingleProduct = ({ products }) => {
	const { id } = useParams();

	const product = products.find((product) => product.id == id );
	if (product === undefined) {
		return null;
	}
	const {name, description, breed, image, adoption_fee} = product;

	return (
		<>
			<Typography component='h2' variant='h2' style={{textAlign: 'center'}}>
				{product.name}
			</Typography>
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
						alt='Dog image'
					/>
					<CardContent key={product.id}>
						
						<Typography variant='subtitle1'>
							<strong>Breed: </strong> {product.breed}
						</Typography>
						<Typography variant='subtitle1'>
							Des:{product.description}
						</Typography>
						<Typography variant='subtitle1'>
							<strong>Adoption fee:</strong> $
							{product.adoption_fee}
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							size='small'
							color='primary'
							href={`/products/${product.id}`}>
							Adopt a Dog
						</Button>
					</CardActions>
				</CardActionArea>
			</Card>
			{/* <Typography variant="h2" component="div">
				{product.name}
			</Typography>
			<br></br>
			<img
				style={{ maxWidth: '150px', height: 'auto' }}
				src={product.image}
			></img>
			<h3>Name:{product.name}</h3>
			<h3>Breed:{product.breed}</h3>
			<div>Description:{product.description}</div>
			<div>${product.adoption_fee}</div>
			<Button>
				<Link to={'/products'}>Back to home</Link>
			</Button>
			{/* <div id="add-to-cart">
                    <Button className= {classes.button} variant="contained" onClick={() => {addToCart()}}>Adopt!</Button>
                </div> */}
		</>
	);
};

export default SingleProduct;
