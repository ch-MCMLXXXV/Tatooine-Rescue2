import React , { Fragment, useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import { getUsersCart } from '../frontend-api/index';

const Cart = ({ token, userData }) => {
    const [orders, setOrder] = useState({products: []});

     useEffect(async () => {
      console.log('userData', userData);
      if (userData.user?.id !== undefined) {
         const usersCart = await getUsersCart(userData.user.id, token);
         console.log(usersCart);
         if (typeof usersCart === 'object') {
            setOrder(usersCart);
         }
    //   } else {
    //      let localCart = JSON.parse(
    //         localStorage.getItem('capstone-cart')
    //      );
    //      if (!localCart) {
    //         localCart = [];
    //         localStorage.setItem(
    //            'capstone-cart',
    //            JSON.stringify(localCart)
    //         );
    //      }
    //      setOrder(localCart);
      }
   }, [userData]);

    if (orders.products.length === 0) {
        return <h1>"There's nothing here!"</h1>
    } else {
        console.log(orders)
        return (
            <div>
                <h1>
                    Your Order #{orders.id}
                </h1>
                <h2>
                    Items in your cart:
                </h2>
                {orders.products && orders.products.map((product) => {
                    return (
                        <div key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Cart;
