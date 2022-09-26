import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
	TextField,
} from '@mui/material';
import { Box, Container } from '@mui/system';

// const Search = ({ products }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [productsToDisplay, setProductsToDisplay] = useState([]);

//     useEffect(() => {
//         const filteredProducts =
//             products.length &&
//             products.filter((product) => productMatches(product, searchTerm));
//         const productsToDisplay = searchTerm.length
//             ? filteredProducts
//             : products;
//         setProductsToDisplay(productsToDisplay);
//     }, [searchTerm]);

//     function productMatches(product, text) {
//         if (product.name.includes(searchTerm)) {
//             return true;
//         }
//         if (product.description.includes(searchTerm)) {
//             return true;
//         }
//         if (product.breed.includes(searchTerm)) {
//             return true;
//         } else {
//             return false;
//         }
//     };

//     return (
//         <Container component="SearchContainer" >
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                 }}>
//                 <Typography variant='h5' component='div' >
//                         Search
//                 </Typography>
//                     <TextField
//                         type="text"
//                         placeholder="search for a dog"
//                         value={searchTerm}
//                         onChange={(event) =>
//                             setSearchTerm(event.target.value)
//                         }
//                     ></TextField>
//                 </Box>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignItems: '',
//                     }}>
//                 <Button
//                     type='submit'
//                     variant='contained'
//                     color='inherit'
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignItems: '',
//                         mt: 1,
//                         mb: 1
//                     }}>
//                         Submit
//                 </Button>
//             </Box>
//         </Container>
//     )
// }

const Search = ({ token, products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [productsToDisplay, setProductsToDisplay] = useState([]);

    useEffect(() => {
        const filteredProducts =
            products.length &&
            products.filter((product) => productMatches(product, searchTerm));
        const productsToDisplay = searchTerm.length ? filteredProducts : products;
        setProductsToDisplay(productsToDisplay);
    }, [searchTerm]);

    function productMatches (product, text) {
        if (product.name.includes(searchTerm)) {
            return true;
        }
        if (product.description.includes(searchTerm)) {
            return true;
        }
        if (product.breed.includes(searchTerm)) {
            return true;
        } else {
            return false;
        }
    }

    return (
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
                    fullwidth
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
    );
};

export default Search;