import { Checkbox, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { addProduct } from '../frontend-api/index';
import Button from '@mui/material/Button'
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import { APIURL } from '..';
import { addProduct } from '../frontend-api';
import { HistoryToggleOff } from '@mui/icons-material';

const AdminCreateProduct = ({products, setProducts, token}) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [fee, setFee] = useState('');
    const [breed, setBreed] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await addProduct({name, fee, breed, quantity, image}, token);
        setProducts([result.data.products, ...products]);
        setName('');
        setFee('');
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
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}>
                </TextField>
                <TextField
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}>
                </TextField>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Will Deliver?" onChange={(event) => setLocation(event.target.value)} />
                </FormGroup>
                <Button sx={{
                    m: 2
                }} type="submit" variant='outlined' >Create</Button>
            </Box>
        </Box>
        </Container>
    </>
}

export default AdminCreateProduct;