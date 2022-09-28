import { Checkbox, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addProduct } from '../frontend-api/index';
import Button from '@mui/material/Button'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import { APIURL } from '..';
import { HistoryToggleOff } from '@mui/icons-material';

const AdminCreateProduct = ({products, setProducts, token}) => {
    const history = useHistory();
    const [name, setName] = useState(products.name);
    const [adoption_fee, setAdoptionFee] = useState(products.adoption_fee);
    const [breed, setBreed] = useState(products.breed);
    const [quantity, setQuantity] = useState(products.quantity);
    const [image, setImage] = useState(products.image)
    const [description, setDescription] = useState(products.description)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await addProduct({name, adoption_fee, breed, quantity, image, description}, token);
        setProducts([data.data.products, ...products]);
        console.log(data)
        setName('');
        setAdoptionFee('');
        setBreed('');
        setQuantity('');
        setImage('');
        history.push('/products');
    };

    return <>
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
            <Typography component='h1' variant='h4'>
                Create a Post
            </Typography> 
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(event) => setBreed(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Fee"
                    value={adoption_fee}
                    onChange={(event) => setAdoptionFee(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Image"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}>
                </TextField>
                <Button sx={{
                    m: 2
                }} type="submit" variant='outlined' >Create</Button>
            </Box>
        </Box>
        </Container>
    </>
}

export default AdminCreateProduct;