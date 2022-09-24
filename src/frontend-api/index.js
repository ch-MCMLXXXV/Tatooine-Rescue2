export const BASE_URL = '/api';

export async function getUser({ token }) {
	try {
		return await fetch(`${BASE_URL}/users`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

// export async function getAPIHealth() {
//    try {
//       const { data } = await axios.get('/api/health');
//       return data;
//    } catch (err) {
//       console.error(err);
//       return { healthy: false };
//    }
// }

export async function registerUser({
	username,
	password,
	email,
	firstName,
	lastName,
}) {
	try {
		return fetch(`${BASE_URL}/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function loginUser({ username, password }) {
	try {
		return fetch(`${BASE_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

// export async function loginUser({ username, password }) {
//    return fetch(`${BASE_URL}/users/login`, {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({
//          user: {
//              username: username,
//              password: password,
//          }
//      })
//    }).then(response => response.json())
//        .then(result => {
//            console.log(result);
//            return result.data.token;
//        })
//        .catch(console.error);
//   }

// export const getUsersCart = async (userId, token) => {
//    const data = await {
//       url: `orders/cart/${userId}`,
//       token,
//    };
//    return data;
// };

export async function createProduct({
	token,
	name,
	description,
	breed,
	image,
	adoption_fee,
}) {
	try {
		return fetch(`${BASE_URL}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				breed: breed,
				image: image,
				adoption_fee: adoption_fee,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchAllProducts() {
	try {
		return fetch(`${BASE_URL}/products`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchProductById(id) {
	try {
		return fetch(`${BASE_URL}/products/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function editProduct({
	token,
	productsId,
	name,
	description,
	breed,
	image,
	adoption_fee,
}) {
	try {
		return fetch(`${BASE_URL}/products/${productsId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				breed: breed,
				image: image,
				adoption_fee: adoption_fee,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function deleteProduct({ token, productsId }) {
	try {
		return fetch(`${BASE_URL}/products/${productsId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result) => {
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}
