import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, Home, Login, Register, Products } from './components';
import SingleProduct from './components/SingleProduct';
import { getUser, fetchAllProducts, getUsersCart } from './frontend-api';
// import { getAPIHealth } from './frontend-api/index';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);
	const [username, setUsername] = useState(
		localStorage.getItem('username') ? localStorage.getItem('username') : ''
	);
	const [userData, setUserData] = useState({});
	const [password, setPassword] = useState('');
	const [order, setOrder] = useState();
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		if (!token) {
			setToken(localStorage.getItem('capstone-token'));
			return;
		}
		const data = await getUser(token);
		setUserData(data);
	}, [token]);

	// products
	useEffect(() => {
		const getAllProducts = async () => {
			const result = await fetchAllProducts();
			console.log(result);
			setProducts(result);
			// setProductsToDisplay(result.data.products);
		};
		getAllProducts().catch(console.error);
	}, [setProducts]);

	// useEffect(async () => {
	// 	setOrder([]);
	// 	if (userData.id !== undefined) {
	// 		const usersCart = await getUsersCart(userData.id, token);
	// 		if (typeof usersCart === 'object') {
	// 			setCart(usersCart);
	// 		}
	// 	} else {
	// 		let localCart = JSON.parse(localStorage.getItem('capstone-cart'));
	// 		if (!localCart) {
	// 			localCart = [];
	// 			localStorage.setItem(
	// 				'capstone-cart',
	// 				JSON.stringify(localCart)
	// 			);
	// 		}
	// 		setCart(localCart);
	// 	}
	// }, [userData]);

	return (
		<>
			<Navbar
				token={token}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				setToken={setToken}
			/>

			<Switch>
				<Route exact path="/home">
					<Home
						token={token}
						setProducts={setProducts}
						products={products}
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						setToken={setToken}
					/>
				</Route>
				<Route exact path="/products">
					<Products
						token={token}
						setProducts={setProducts}
						products={products}
					/>
				</Route>
				<Route exact path="/login">
					<Login
						token={token}
						setToken={setToken}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
					/>
				</Route>
				<Route exact path="/register">
					<Register
						token={token}
						setToken={setToken}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
						email={email}
						setEmail={setEmail}
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
					/>
				</Route>
				<Route exact path="/products:productId">
					<SingleProduct products={products} />
				</Route>
				/>
				{/* <Route path="/cart/:user" element={<Cart />} />
					<Route path="/cart/:userId" element={<Cart />} /> */}
			</Switch>
		</>
	);
};

export default App;
