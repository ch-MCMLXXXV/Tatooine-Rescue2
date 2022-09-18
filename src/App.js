import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, Home, Login, Register, Dog } from './components';
import { getUser, fetchAllproducts, getUsersCart } from './frontend-api';
import { getAPIHealth } from './frontend-api';

const App = () => {
	const [APIHealth, setAPIHealth] = useState('');
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);
	const [username, setUsername] = useState(
		localStorage.getItem('username') ? localStorage.getItem('username') : ''
	);
	const [userData, setUserData] = useState({});
	const [password, setPassword] = useState();
	const [order, setOrder] = useState();
	const [products, setproducts] = useState();
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const getAPIStatus = async () => {
			const { healthy } = await getAPIHealth();
			setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
		};

		getAPIStatus();
	}, []);

	useEffect(async () => {
		if (!token) {
			setToken(localStorage.getItem('capstone-token'));
			return;
		}
		const data = await getUser(token);
		setUserData(data);
	}, [token]);

	// products
	useEffect(async () => {
		const response = await fetchAllproducts();
		setproducts(response);
	}, []);

	useEffect(async () => {
		setOrder([]);
		if (userData.id !== undefined) {
			const usersCart = await getUsersCart(userData.id, token);
			if (typeof usersCart === 'object') {
				setCart(usersCart);
			}
		} else {
			let localCart = JSON.parse(localStorage.getItem('capstone-cart'));
			if (!localCart) {
				localCart = [];
				localStorage.setItem(
					'capstone-cart',
					JSON.stringify(localCart)
				);
			}
			setCart(localCart);
		}
	}, [userData]);

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
						products
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
