const { createUser, createProducts, createOrders } = require('./index');
const client = require('./client');

async function dropTables() {
	// drop all tables, in the correct order

	try {
		console.log('Starting to drop tables...');

		await client.query(`
		DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
      `);
		console.log('Finished dropping tables!');
	} catch (error) {
		console.log('Error while dropping tables!');

		throw error;
	}
}

async function createTables() {
	console.log('Starting to build tables...');
	// create all tables, in the correct order
	try {
		await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(500) NOT NULL,
            UNIQUE (username, email)
            );

        CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)  NOT NULL,
            description VARCHAR(255) NOT NULL,
            adoption_fee INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            breed VARCHAR(255) NOT NULL,
            image TEXT,
            "isActive" BOOLEAN DEFAULT true
            );

        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "purchaseComplete" BOOLEAN DEFAULT false,
            "adoption_fee" INTEGER,
            "productsId" INTEGER REFERENCES products(id),
            quantity INTEGER NOT NULL
            );

		CREATE TABLE order_products(
			id SERIAL PRIMARY KEY,
			"productsId" INTEGER REFERENCES products(id),
			"ordersId" INTEGER REFERENCES orders(id),
			"quantity" INTEGER NOT NULL DEFAULT 0,
			"adoption_fee" FLOAT NOT NULL,
			UNIQUE ("ordersId" , "productsId")
			);

    `);
		console.log('Finished Building tables!');
	} catch (error) {
		console.log('Error constructing tables!');

		throw error;
	}
}

async function createInitialUsers() {
	console.log('Starting to create users...');
	try {
		const usersToCreate = [
			{
				username: 'eguilder0',
				firstName: 'Eleonora',
				lastName: 'Guilder',
				email: 'eguilder0@vinaora.com',
				password: 'xefxbiZ',
			},
			{
				username: 'sflea1',
				firstName: 'Shaylyn',
				lastName: 'Flea',
				email: 'sflea1@mlb.com',
				password: 'YaUH8Nte',
			},

			{
				username: 'acolam2',
				firstName: 'Arda',
				lastName: 'Colam',
				email: 'acolam2@washingtonpost.com',
				password: 'VxV1CAQoHjA',
			},

			{
				username: 'fspurnier3',
				firstName: 'Farrell',
				lastName: 'Spurnier',
				email: 'fspurnier3@cnet.com',
				password: 'Lt5CfVgtOBI',
			},
		];
		const users = await Promise.all(usersToCreate.map(createUser));

		console.log('Users created:');
		console.log(users);
		console.log('Finished creating users!');
	} catch (error) {
		console.error('Error creating users!');
		throw error;
	}
}

async function createInitialproductsTable() {
	console.log('Starting to create products...');
	try {
		const productsToCreate = [
			{
				name: 'Yoda',
				description:
					'Tan Frenchy with the cutest side eye ever. Get your own little yoda to carry around.',
				adoption_fee: 100,
				quantity: 5,
				breed: 'French Bull Dog',
				image: 'https://img.freepik.com/free-photo/french-bulldog-dog-breeds-white-polka-dot-black-marble_1150-25345.jpg?w=1380&t=st=1663888194~exp=1663888794~hmac=4fdfd75a0ec47aa11ec79564e36dee8c1183ad34abc2fe36cfc5af25ba1ff148',
				isActive: true,
			},
			{
				name: 'Obi',
				description:
					'If you feel like you need your very own Jedi Master to guide you through life then this noble doggo is for you.',
				adoption_fee: 100,
				quantity: 11,
				breed: 'Samoyed',
				image: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvYTAxNS1oZWxlbmFsLTgzLmpwZw.jpg',
				isActive: true,
			},
			{
				name: 'Luke',
				description:
					'Do not let this breed type intimidate you as this is the sweetest baby around.',
				adoption_fee: 100,
				quantity: 12,
				breed: 'Mix breed',
				image: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMDcyMDQxLWltYWdlLWt3dnk1NTRvLmpwZw.jpg',
				isActive: true,
			},
			{
				name: 'Chewbacca',
				description:
					'Get your own big furry best friend to travel the galaxy with.',
				adoption_fee: 100,
				quantity: 2,
				breed: 'Tibetan Terrier',
				image: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJ0ZXJyaWVyX2JpdGNoX3RpYmV0YW5fdGVycmllci1pbWFnZS1reWNmNXRxdy5qcGc.jpg',
				isActive: true,
			},
			{
				name: 'Leia',
				description:
					'Do not let that sweet face fool you as she has a heart of a fighter.',
				adoption_fee: 100,
				quantity: 5,
				breed: 'Goldendoodle',
				image: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4MDcyODEtaW1hZ2Uta3d5b2VzOTAuanBn.jpg',
				isActive: true,
			},
			{
				name: 'Han',
				description:
					'This handsome doggo is a suave partner in crime for all of your galaxy adventuring needs.',
				adoption_fee: 100,
				quantity: 2,
				breed: 'Lab',
				image: 'https://images.rawpixel.com/image_1000/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4NzE0NDgyLWltYWdlLWt3dnhqNzZlLmpwZw.jpg',
				isActive: true,
			},
			{
				name: 'Boba Fett',
				description:
					'This little bounty hunter will steal your heart and your bounty.',
				adoption_fee: 100,
				quantity: 1,
				breed: 'Corgi',
				image: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmw5Mjg4ODQ3MzU1LWltYWdlLWt0d3Boa3luLmpwZw.jpg',
				isActive: true,
			},
			{
				name: 'Jaba',
				description:
					'This big guy will steal your stuff and eat all your food.',
				adoption_fee: 100,
				quantity: 1,
				breed: 'Bulldog',
				image: 'https://images.rawpixel.com/image_1000/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4ODcxNzQ3LWltYWdlLWt3eW83MzkzLmpwZw.jpg',
				isActive: true,
			},
		];
		const products = await Promise.all(
			productsToCreate.map(createProducts)
		);

		console.log('products created:');
		console.log(products);
		console.log('Finished creating products!');
	} catch (error) {
		console.error('Error creating products!');
		throw error;
	}
}

async function createInitialOrdersTable() {
	console.log('Starting to create order table!');
	try {
		const ordersToCreate = [
			{
				userId: 3,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 1,
				quantity: 2,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 1,
				quantity: 3,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 3,
				quantity: 1,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 7,
				quantity: 5,
			},
			{
				userId: 1,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 2,
				quantity: 1,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 6,
				quantity: 3,
			},
			{
				userId: 2,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 5,
				quantity: 1,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 3,
				quantity: 4,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 2,
				quantity: 1,
			},
			{
				userId: 4,
				purchaseComplete: false,
				adoption_fee: 100,
				productsId: 4,
				quantity: 1,
			},
		];
		const orders = await Promise.all(ordersToCreate.map(createOrders));

		console.log('Orders created:');
		console.log(orders);
		console.log('Finished creating orders!');
	} catch (error) {
		console.error('Error creating orders!');
		throw error;
	}
}

async function rebuildDB() {
	try {
		await dropTables();
		await createTables();
		await createInitialUsers();
		await createInitialproductsTable();
		await createInitialOrdersTable();
	} catch (error) {
		console.log('Error during rebuildDB');
		throw error;
	}
}

module.exports = {
	rebuildDB,
	dropTables,
	createTables,
};
