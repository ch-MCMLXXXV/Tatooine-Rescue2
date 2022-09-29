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
import { HistoryToggleOff, SettingsBackupRestoreRounded, SettingsInputCompositeSharp } from '@mui/icons-material';

const AdminCreateProduct = ({ products, setProducts }) => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [adoption_fee, setAdoptionFee] = useState("");
    const [breed, setBreed] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await addProduct({
            token,
            name,
            description,
            adoption_fee,
            quantity,
            breed,
            image,
            isActive
        });
        // console.log(response)
        // products.push(response)
        // setProducts(products);
        alert("Your product has been added.")
        history.push("/products")
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
}

export default AdminCreateProduct;