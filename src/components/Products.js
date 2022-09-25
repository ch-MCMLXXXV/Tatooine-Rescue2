import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
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

const Products = ({ products }) => {

	const [searchQuery, updateSearchQuery] = useState('');
	const [category, setCategory] = useState('');
	let productsToDisplay = products;

	function productMatches(product, text) {
		const searchTerm = text.toLowerCase();

		const { title, price, category } = product;

		const toMatch = [title, price, category];

		for (const field of toMatch) {
			if (field.toString().toLowerCase().includes(searchTerm)) {
				return true;
			}
		}
		return false;
	}

	if (searchQuery.length > 0) {
		productsToDisplay = products.filter((product) =>
			productMatches(product, searchQuery)
		);
	} else {
		productsToDisplay = products;
	}

	return (
		<>
			<h2 id="productstitle">Dogs for Adoption</h2>

			<h2>Search</h2>
			<input
				type="text"
				placeholder="search for a dog"
				value={searchQuery}
				onChange={(event) => {
					updateSearchQuery(event.target.value);
				}}
			/>
			{productsToDisplay?.map((product) => (
				<div key={product.id} style={{ border: '1px solid black' }}>
					<img
						style={{ maxWidth: '150px', height: 'auto' }}
						src={product.image}
					></img>
					<h3>Name:{product.name}</h3>
					<h3>Breed:{product.breed}</h3>
					<div>Description:{product.description}</div>
					<div>${product.adoption_fee}</div>
					<Button>
						<Link to={`/products/${product.id}`}>
							View more details
						</Link>
					</Button>
				</div>
			))}
		</>
	);
};

export default Products;
