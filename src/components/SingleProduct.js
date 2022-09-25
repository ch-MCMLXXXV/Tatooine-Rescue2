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
import { CardActionArea } from '@mui/material';

const SingleProduct = ({ products }) => {
	const { productId } = useParams();

	const product = products.find((product) => product.id === productId );
	if (product === undefined) {
		return null;
	}
	const {name, description, breed, image, adoption_fee} = product;

	return (
		<>
			<Typography variant="h2" component="div">
				Tatooine Dogs For Adoption
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
