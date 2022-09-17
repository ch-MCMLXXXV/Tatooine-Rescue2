import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Navbar, Home, Login, Register, Cart } from "../components";
import { getAPIHealth } from "../frontend-api";
import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [cart, setCart] = useState();
  const [order, setOrder] = useState();
  const [dogs, setDogs] = useState();

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getMe(token);

      return setUser(userInfo);
    };
    getUserInfo();
  }, [token]);

  useEffect(() => {
    const getActiveCart = async () => {
      const cart = await getCartByUser(token);
      console.log("useEffect", cart);
      return setCart(cart);
    };
    getActiveCart();
  }, [token]);

  if (cart) {
    console.log("cart is", cart);
  }

  return (
    <>
      <Navbar token={token} />

      <Switch>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route path="Home" element={<Dog token={token} />}></Route> */}
        <Route path="Register" element={<Register />}></Route>
        <Route path="Dog" element={<Dog token={token} />}></Route>
        <Route path="users" element={<Users token={token} />}></Route>
        <Route path="orders" element={<Cart />}></Route>
        <Route
          path="create"
          element={<Create token={token} dogs={dogs} setDogs={setDogs} />}
        ></Route>
        <Route path="inbox" element={<Inbox token={token} />}></Route>
        <Route
          path="Login"
          element={<Login token={token} setToken={setToken} />}
        ></Route>
        <Route path="register" element={<Register />}></Route>
        <Route
          path="logout"
          element={<Logout token={token} setToken={setToken} />}
        ></Route>
      </Switch>
    </>
  );
};

export default App;
