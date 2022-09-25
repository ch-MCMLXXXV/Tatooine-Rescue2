import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { editProduct } from '../frontend-api/index';


const AdminEditPost = ({products, token}) => {
    const history = useHistory();
    const [id, setId] = useState(products.id);
    const [name, setName] = useState(products.name);
    const [fee, setFee] = useState(products.adoption_fee);
    const [breed, setBreed] = useState(products.breed);
    const [quantity, setQuantity] = useState(products.quantity);
    const [image, setImage] = useState(products.image);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await editItem({productsId, adoption_fee, image, quantity, breed, name}, token);
        history.push('/products');
    }

    return (
        <>
            <h2></h2>
            <form onSubmit={handleSubmit}>
                <div id ="TextField">
                <input
                    type="text"
                    placeholder="Dog Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}

                ></input>
                <input
                    type="text"
                    placeholder="Adoption Fee"
                    value={adoption_fee}}
                    onChange={(event) => setFee(event.target.value)}

                ></input>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}

                ></input>
                <input
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(event) => setBreed(event.target.value)}

                ></input>
            </div>
                <input
                    type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                ></input>
                </div>
                <button type="submit">Submit Changes</button>
            </form>
        </>
        );
        }
        export default AdminEditPost;