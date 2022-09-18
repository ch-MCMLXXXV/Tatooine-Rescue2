import React, { useEffect } from 'react';

const Home = ({ products, setproducts, setproductsToDisplay }) => {
	useEffect(() => {
		const fetchAllproducts = async () => {
			const response = await fetch(URL, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			setproducts(result.data.products);
			setproductsToDisplay(result.data.products);
		};
		fetchAllproducts();
	});

	return (
		<div>
			<header>
				<h1>Home Page</h1>
			</header>
			<h2>products For Adoptions</h2>
			{products.map((dog) => (
				<div key={dog._id}>
					<h3>{dog.name}</h3>
					<div>{dog.description}</div>
					<div>{dog.breed}</div>
					<div>{dog.image}</div>
					<div>{dog.adoption_fee}</div>
				</div>
			))}
		</div>
	);
};

export default Home;
