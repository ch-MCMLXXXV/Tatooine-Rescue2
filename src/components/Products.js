import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import {
	CardActions,
	Container,
	Box,
	CardActionArea,
	Button,
	TextField,
} from '@mui/material';


const Products = ({ products, setProducts }) => {
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setProducts(products)
	}, []);

	const filteredProducts =
		products.length &&
		products.filter((product) => productMatches(product, searchTerm));
		
	const productsToDisplay = searchTerm.length
		? filteredProducts
		: products;
		
	function productMatches (product) {
        if (product.name.toLowerCase().includes(searchTerm)) {
            return true;
        }
        if (product.description.toLowerCase().includes(searchTerm)) {
            return true;
        }
        if (product.breed.toLowerCase().includes(searchTerm)) {
            return true;
        } else {
            return false;
        }
    }

	return (
		<>
		<Typography variant='h2' component='div'>
            	Puppies For Adoption
         	</Typography>
		 <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }} component="SearchContainer">
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    }}>
                <TextField
                    margin='normal'
                    // fullwidth
                    label='Search'
                    type='text'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    ></TextField>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: ''
                    }}>
                </Box>
        </Container>
			
			
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
		</>
	);
};
export default Products;
