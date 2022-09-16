import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

export async function registerUser({ username, password }) {
	try {
		return fetch(`${BASE_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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

export async function loginUser({ username, password }) {
	try {
		return fetch(`${BASE_URL}/dogs/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				localStorage.setItem("token", result.token);
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export async function fetchAllDogs() {
	try {
		return fetch(`${BASE_URL}/dogs`, {
			headers: {
				"Content-Type": "application/json",
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

export async function createDog ({ token, name, description, breed, image, adoption_fee }) {
	try {
		return fetch (`${BASE_URL}/dogs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				breed: breed,
				image: image,
				adoption_fee: adoption_fee
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

export async function editDog ({ token, dogsId, name, description, breed, image, adoption_fee }) {
	try {
		return fetch (`${BASE_URL}/dogs/${dogsId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Beaer ${token}`
			},
			body: JSON.stringify ({
				name: name,
				description: description,
				breed: breed,
				image: image,
				adoption_fee: adoption_fee
			})
		})
		.then((response) => response.json())
		.then((result) => {
			return result;
		});
	}
	catch (error) {
		console.error(error);
	}
}

export async function deleteDog ({ token, dogsId }) {
	try {
		return fetch (`${BASE_URL}/dogs/${dogsId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		})
		.then((response) => response.json())
		.then((result) => {
			return result;
		});
	} catch (error) {
		console.error(error);
	}
}
