import React from 'react';

const Dog = ({ products }) => {
	return (
		<div className="dog">
			<p>
				<b>Dog #{products.id}</b>
			</p>
			;<p>Name: {products.name}</p>;
			<p>Description: {products.description}</p>
			<p>Breed: {products.breed}</p>
			<p>Image: {products.image}</p>
			<p>Adoption Fee: {products.adoption_fee}</p>
		</div>
	);
};

export default Dog;
