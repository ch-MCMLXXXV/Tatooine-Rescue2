import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { editProduct } from '../frontend-api/index';
import { Checkbox, CssBaseline } from '@mui/material';
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'

const AdminEditProduct = ({products, setProducts, token}) => {
    const { id } = useParams();

    const product = products.find((product) => product.id == id);
        
    const [name, setName] = useState(product?.name);
    const [adoption_fee, setAdoptionFee] = useState(product?.adoption_fee);
    const [breed, setBreed] = useState(product?.breed);
    const [description, setDescription] = useState(product?.description);
    const [quantity, setQuantity] = useState(product?.quantity);
    const [image, setImage] = useState(product?.image);
    const [isActive, setIsActive] = useState(product?.isActive);
        
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await editProduct({
            token,
            name,
            description,
            adoption_fee,
            quantity,
            breed,
            image,
            isActive,
            productId:id,
        });
        alert("Your product has been updated.")
        window.location.assign("/products")
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
                Edit a Post
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
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}>
                </TextField>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Active?"
                    onChange={(event) => setIsActive(event.target.value)}/>
                <Button sx={{
                    m: 2
                }} type="submit" variant='outlined' >Edit</Button>
            </Box>
        </Box>
        </Container>
    </>
    
};
export default AdminEditProduct;
