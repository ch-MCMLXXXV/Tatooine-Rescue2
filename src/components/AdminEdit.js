import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { editProduct } from '../frontend-api/index';
import { Checkbox, CssBaseline } from '@mui/material';
import { Container } from '@mui/system'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import { APIURL } from '..';
import { HistoryToggleOff, SettingsBackupRestoreRounded, SettingsInputCompositeSharp } from '@mui/icons-material';

const AdminEditProduct = ({products, token}) => {
    const history = useHistory();
    const [id, setId] = useState(products.id);
    const [name, setName] = useState(products.name);
    const [adoption_fee, setAdoptionFee] = useState(products.adoption_fee);
    const [breed, setBreed] = useState(products.breed);
    const [description, setDescription] = useState(products.description);
    const [quantity, setQuantity] = useState(products.quantity);
    const [image, setImage] = useState(products.image);
    const [isActive, setIsActive] = useState(products.isActive);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await editProduct({id, adoption_fee, image, quantity, breed, name}, token);
        history.push('/products');
    }

    return (
        <>
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
                }} type="submit" variant='outlined' >Create</Button>
            </Box>
        </Box>
        </Container>
        </>
    );
};
export default AdminEditProduct;
