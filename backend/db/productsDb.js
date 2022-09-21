const client = require('./client');

async function createProducts({
	name,
	description,
	adoption_fee,
	quantity,
	breed,
	image,
	isActive,
}) {
	try {
		const {
			rows: [products],
		} = await client.query(
			`
        INSERT INTO products (name, description, adoption_fee, quantity, breed, image, "isActive")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
			[name, description, adoption_fee, quantity, breed, image, isActive]
		);
		console.log(products);
		return products;
	} catch (error) {
		throw error;
	}
}

async function getAllProducts() {
	try {
		const { rows: products } = await client.query(`
        SELECT *
        FROM products
        `);
		return products;
	} catch (error) {
		throw error;
	}
}

async function getProductsById(id) {
	try {
		const {
			rows: [products],
		} = await client.query(
			`
        SELECT * FROM products
        WHERE id = $1
        `,
			[id]
		);
		return products;
	} catch (error) {
		throw error;
	}
}

async function getProductsByCategory(breed) {
	try {
		const { rows: products } = await client.query(
			`
        SELECT *
        FROM products
        WHERE breed = $1
        `,
			[breed]
		);
		return products;
	} catch {}
}

async function updateProducts({
	name,
	adoption_fee,
	quantity,
	breed,
	image,
	id,
}) {
	try {
		const { rows: products } = await client.query(
			`
            UPDATE products
            SET name = $1,  
            adoption_fee= $2, 
            quantity = $3, 
            breed = $4, image = $5
            WHERE id = $6;
        `,
			[name, adoption_fee, quantity, breed, image, id]
		);
		return products;
	} catch {}
}

module.exports = {
	createProducts,
	getAllProducts,
	getProductsById,
	getProductsByCategory,
	updateProducts,
};