import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUsersCart } from "../frontend-api/index";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Button } from "@mui/material";

const Cart = ({ token, userData, product }) => {
  const [orders, setOrder] = useState({ products: [] });
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const navigate = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    setPurchaseComplete(true);
    navigate.push("/");
    alert("Purchase completed successfully");
  };

  useEffect(async () => {
    console.log("userData", userData);
    if (userData.user?.id !== undefined) {
      const usersCart = await getUsersCart(userData.user.id, token);
      console.log(usersCart);
      if (typeof usersCart === "object") {
        setOrder(usersCart);
      }
    }
  }, [userData]);

  if (orders.products.length === 0) {
    return <h1>"There's nothing here!"</h1>;
  } else {
    console.log(orders);

    return (
      <>
        <Grid
          rowSpacing={2}
          alignitems="center"
          containter
          direction="column"
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          {orders.products &&
            orders.products.map((product) => (
              <Grid
                key={product.id}
                item
                xs={3}
                md={2}
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    width: "25%",
                    borderRadius: "16px",
                    backgroundColor: "aliceblue",
                    boxShadow: "5px 5px grey",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={100}
                      src={product.image}
                      alt="Dog image"
                    />
                    <CardContent key={product.id}>
                      <Typography component="h2" variant="h5">
                        {product.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Breed: </strong> {product.breed}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Adoption fee:</strong> {product.adoption_fee}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          <Button onClick={handleClick}>Checkout!</Button>
        </Grid>
      </>
      // return <h1>"There's nothing here!"</h1>
      // } else {
      //     console.log(orders)
      //     return (
      //         <div>
      //             <h1>
      //                 Your Order #{orders.id}
      //             </h1>
      //             <h2>
      //                 Items in your cart:
      //             </h2>
      //             {orders.products && orders.products.map((product) => {
      //                 return (
      //                     <div key={product.id}>
      //                         <h3>{product.name}</h3>
      //                         <p>{product.description}</p>
      //                         <p>{product.price}</p>
      //                     </div>
      //                 )
      //             })}
      //         </div>
      //     )
    );
  }
};

export default Cart;
