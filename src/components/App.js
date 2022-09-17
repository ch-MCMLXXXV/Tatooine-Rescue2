import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, Home, Login, Register, Dog } from './index';
import { getAPIHealth } from '../frontend-api';
import '../style/App.css';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);
	const [username, setUsername] = useState(
		localStorage.getItem('username') ? localStorage.getItem('username') : ''
	);
	const [password, setPassword] = useState();
	const [order, setOrder] = useState();
	const [dogs, setDogs] = useState();

	useEffect(() => {
		const getAPIStatus = async () => {
			const { healthy } = await getAPIHealth();
			setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
		};

		getAPIStatus();
	}, []);

	// useEffect(() => {
	// 	const getUserInfo = async () => {
	// 		const userInfo = await getMe(token);

	// 		return setUser(userInfo);
	// 	};
	// 	getUserInfo();
	// }, [token]);

	// useEffect(() => {
	// 	const getActiveCart = async () => {
	// 		const cart = await getCartByUser(token);
	// 		console.log('useEffect', cart);
	// 		return setCart(cart);
	// 	};
	// 	getActiveCart();
	// }, [token]);

	// if (cart) {
	// 	console.log('cart is', cart);
	// }

	return (
		<div className="container">
			<main>
				<div className="title">Tatooine Rescue</div>
				<Navbar token={token} />
				<nav>
					<Link className="tab" to="/home">
						Home
					</Link>
					<Link className="tab" to="/login">
						Login/Logout
					</Link>
					<Link className="tab" to="/register">
						Register
					</Link>
					<Link className="tab" to="/dog">
						Dogs
					</Link>
					{/* {token ? (
						// <Link className="tab" to="/cart">
						// 	Cart
						// </Link>
					) : null} */}
				</nav>

				<Switch>
					<Route path="/" element={<Home token={token} />} />
					<Route path="/home" element={<Home token={token} />} />
					<Route
						path="/login"
						element={
							<Login
								token={token}
								setToken={setToken}
								username={username}
								setUsername={setUsername}
							/>
						}
					/>
					<Route
						path="/register"
						element={
							<Register
								token={token}
								setToken={setToken}
								username={username}
								setUsername={setUsername}
							/>
						}
					/>
					<Route path="/dog" element={<Dog />} />
					{/* <Route path="/cart/:user" element={<Cart />} />
					<Route path="/cart/:userId" element={<Cart />} /> */}
				</Switch>
			</main>
		</div>
	);
};

export default App;
