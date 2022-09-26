import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Search from './Search';
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
	TextField,
} from '@mui/material';

const Products = ({ products, setProducts, setProductsToDisplay }) => {
	const [searchQuery, updateSearchQuery] = useState('');
	const [category, setCategory] = useState('');
	// const [searchTerm, setSearchTerm] = useState('');
	let productsToDisplay = products;

	// const Search = ({ products, setProductsToDisplay }) => {
	// 	const [searchTerm, setSearchTerm] = useState('');

	// 	useEffect(() => {
	// 		const filteredProducts =
	// 			products.length &&
	// 			products.filter((product) => productMatches(product, searchTerm));
	// 		const productsToDisplay = searchTerm.length
	// 			? filteredProducts
	// 			: products;
	// 		setProductsToDisplay(productsToDisplay);
	// 	}, [searchTerm]);

	// 	function productMatches(product, text) {
	// 		if (product.name.includes(searchTerm)) {
	// 			return true;
	// 		}
	// 		if (product.description.includes(searchTerm)) {
	// 			return true;
	// 		}
	// 		if (product.breed.includes(searchTerm)) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	}
	// };

	return (
		<>
			<Typography variant='h2' component='div'>
            	Puppies For Adoption
         	</Typography>
			<Search
				products={products}
				setProducts={setProducts}
				setProductsToDisplay={setProductsToDisplay}
			/>

			{/* <Typography variant='h5' component='div'>
				Search
			</Typography>
			<TextField
				type="text"
				placeholder="search for a dog"
				value={searchTerm}
				onChange={(event) =>
					setSearchTerm(event.target.value)
				}
			></TextField> */}
			<Grid
				container
				spacing={{ xs: 6}}
				columns={{ xs: 4, sm: 12 }}>
				{productsToDisplay?.map((product) => (
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
								alt='Dog image'
							/>
							<CardContent key={product.id}>
								<Typography component='h2' variant='h5'>
									{product.name}
								</Typography>
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
					</Grid>
		  		))}
	   		</Grid>

			{/* {productsToDisplay?.map((product) => (
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
					</Button> */}
				{/* // </div> */}
			{/* // ))} */}
		</>
	);
};
export default Products;
