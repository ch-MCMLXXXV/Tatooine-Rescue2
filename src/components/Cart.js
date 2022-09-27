import React , { Fragment, useEffect, useState }  from "react";
import { useParams } from "react-router-dom";


const Cart = ({ orders }) => {
    if (!orders || (orders.length === 0)) {
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
