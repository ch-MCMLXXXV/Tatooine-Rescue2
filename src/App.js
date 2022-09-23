import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
   Navbar,
   Home,
   Login,
   Register,
   Products,
} from './components';
import {
   getUser,
   fetchAllproducts,
   getUsersCart,
} from './frontend-api';
// import { getAPIHealth } from './frontend-api/index';

const App = () => {
   const [APIHealth, setAPIHealth] = useState('');
   const [token, setToken] = useState(
      localStorage.getItem('token')
         ? localStorage.getItem('token')
         : ''
   );
   const [username, setUsername] = useState(
      localStorage.getItem('username')
         ? localStorage.getItem('username')
         : ''
   );
   const [userData, setUserData] = useState({});
   const [password, setPassword] = useState('');
   const [order, setOrder] = useState();
   const [products, setproducts] = useState([]);
   const [cart, setCart] = useState([]);
   const [email, setEmail] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');

   //    useEffect(() => {
   //       const getAPIStatus = async () => {
   //          const { healthy } = await getAPIHealth();
   //          setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
   //       };

   //       getAPIStatus();
   //    }, []);

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
      const getAllproducts = async () => {
         const result = await fetchAllproducts();
         console.log(result);
         setproducts(result);
         // setproductsToDisplay(result.data.products);
      };
      getAllproducts().catch(console.error);
   }, [setproducts]);

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
      <div className='container'>
         <main>
            <div className='title'>Tatooine Rescue</div>
            <Navbar token={token} />
            {/* <nav>
               <Link className='tab' to='/home'>
                  Home
               </Link>
               <Link className='tab' to='/login'>
                  Login/Logout
               </Link>
               <Link className='tab' to='/register'>
                  Register
               </Link>
               <Link className='tab' to='/dog'>
                  products
               </Link>

            </nav> */}

            <Switch>
               {/* <Route
                  exact
                  path='/'
                  element={
                     <Home
                        token={token}
                        setproducts={setproducts}
                        products={products}
                     />
                  }
               /> */}
               <Route exact path='/'>
                  <Home
                     token={token}
                     setproducts={setproducts}
                     products={products}
                  />
               </Route>
               <Route path='/home'>
                  <Home
                     token={token}
                     setproducts={setproducts}
                     products={products}
                  />
               </Route>
               <Route path='/login'>
                  <Login
                     token={token}
                     setToken={setToken}
                     username={username}
                     setUsername={setUsername}
                  />
               </Route>
               <Route path='/register'>
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
               <Route path='/products' element={<Products />} />
               {/* <Route path="/cart/:user" element={<Cart />} />
					<Route path="/cart/:userId" element={<Cart />} /> */}
            </Switch>
         </main>
      </div>
   );
};

export default App;
