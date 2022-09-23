import React from "react";
import { useHistory } from "react-router-dom";

const cartCheckout = ({ cart, user }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/checkout`;
    history.push(path);
  };
  if (!cart || cart.length === 0) {
    return <h1>{user.userName} "Nothing in your cart. Go add something!"</h1>;
  } else {
    return (
      <div>
        <h1>Hello {user.userName}</h1>
        <h1>Your Order #{cart.id}</h1>
        <h2>Items in your cart:</h2>

        {cart.products &&
          cart.products.map((product) => {
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            );
          })}
        <button onClick={routeChange}>Submit Payment!</button>
      </div>
    );
  }
};

export default cartCheckout;
