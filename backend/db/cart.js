const client = require('../client');
const { getProductsById } = require('./productsDb');
const { getOrderById } = require('./orders');

async function getOrderProductById({ id }) {
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
            SELECT *
            FROM cart
            WHERE id = $1;
        `,
			[id]
		);
		return orderProduct;
	} catch (error) {
		throw error;
	}
}

async function getOrderProductByOrderAndProduct(orderID, productsId) {
	try {
		const orderProduct = await client.query(
			`
            SELECT *
            FROM cart
            WHERE "orderID" = $1,
            AND "productsId" = $2;
        `,
			[orderID, productsId]
		);

		return orderProduct;
	} catch (error) {
		throw error;
	}
}

async function addProductToOrder({ orderId, productsId, price, quantity }) {
	try {
		const { rows: cart } = await client.query(
			`
        SELECT id, "productsId", "orderId"
        FROM cart
        WHERE "orderId" = $1;
    `,
			[orderId]
		);
		console.log('add to order', cart);
		const inCart = cart.filter((cart) => cart.productsId === productsId);

		if (inCart.length === 0) {
			const {
				rows: [cart],
			} = await client.query(
				`
            INSERT INTO cart("orderId", "productsId", price, quantity)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
				[orderId, productsId, price, quantity]
			);
			return cart;
		} else {
			updateOrderProduct({ id: inCart[0].id, price, quantity });
		}
	} catch (error) {
		console.error(error);
	}
}

async function updateOrderProduct({ orderId, productsId, price, quantity }) {
	try {
		const {
			rows: [productsInOrder],
		} = await getProductsByOrder({ orderId });
		const isInOrder = productsInOrder.map((productInOrder) => {
			if (productInOrder.id !== productsId) {
				return false;
			} else {
				return true;
			}
		});

		if (isInOrder) {
			const orderProduct = await getOrderProductByOrderAndProduct(
				orderId,
				productsId
			);

			const newPrice = orderProduct.price + price * quantity;
			const newQuantity = orderProduct.quantity + quantity;
			const values = `price = ${newPrice}, quantity = ${newQuantity}`;

			const {
				rows: [updatedProduct],
			} = await client.query(
				`
                UPDATE cart
                SET ${values}
                WHERE id = $1
                RETURNING *;
            `,
				[orderProduct.id]
			);

			return updatedProduct;
		} else {
			return await addProductToOrder({
				orderId,
				productsId,
				price,
				quantity,
			});
		}
	} catch (error) {
		throw error;
	}
}

async function destroyOrderProduct({ id }) {
	try {
		const {
			rows: [destroyedProduct],
		} = await client.query(
			`
            DELETE FROM cart
            WHERE id = $1
            RETURNING *;
        `,
			[id]
		);

		return destroyedProduct;
	} catch (error) {
		throw error;
	}
}

async function getProductsByOrder({ id }) {
	try {
		const { rows: products } = await client.query(
			`
            SELECT "productsId", quantity, price
            FROM cart
            WHERE "orderId" = $1;
        `,
			[id]
		);

		const allProducts = Promise.all(
			products.map(async (product) => {
				const newProduct = await getProductById({
					productsId: product.productsId,
				});
				newProduct.price =
					Math.round(
						newProduct.price * product.quantity * 100 +
							Number.EPSILON
					) / 100;
				newProduct.quantity = product.quantity;
				delete newProduct.inStock; // this isn't specific to cart
				console.log(newProduct);
				return newProduct;
			})
		);

		return allProducts;
	} catch (error) {
		throw error;
	}
}

async function getOrdersByProduct({ id }) {
	try {
		const {
			rows: [orders],
		} = await client.query(
			`
        SELECT "orderId"
        FROM cart
        WHERE "productsId" = $1;
        `,
			[id]
		);

		const allOrders = orders.map(async (order) => {
			const newOrder = await getOrderById(order.id);
			return newOrder;
		});

		return orders;
	} catch (error) {
		throw error;
	}
}

// the "build carts" function
async function getOrdersAndProducts(orderIds) {
	try {
		let carts = await Promise.all(
			orderIds.map(async (orderId) => {
				const order = await getOrderById({ id: orderId.id });
				const products = await getProductsByOrder({
					id: order.id,
				});
				order.products = products;
				return order;
			})
		);
		// this checks to see if there's only one cart, then returns it as an object and not an array of carts
		// this is helpful for /cart so that we don't have to map
		if (carts.length === 1) {
			carts = carts[0];
		}
		return carts;
	} catch (error) {
		throw error;
	}
}

// gets all 'created' carts for a user
async function getCartByUser(id) {
	try {
		const userOrders = await getOrderByUserAndStatus(id, 'created');
		const carts = await getOrdersAndProducts(userOrders);

		return carts;
	} catch (error) {
		throw error;
	}
}

// gets a user's entire order history
async function getAllCartsByUser({ user }) {
	try {
		const userOrders = await getOrderByUser(user);
		const carts = await getOrdersAndProducts(userOrders);

		return carts;
	} catch (error) {
		throw error;
	}
}

// just get a singular cart
async function getCartByOrderId({ id }) {
	try {
		const order = await getOrderById({ id });
		const products = await getProductsByOrder(order);
		order.products = products;

		return order;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getOrderProductById,
	updateOrderProduct,
	destroyOrderProduct,
	addProductToOrder,
	getProductsByOrder,
	getOrdersByProduct,
	getOrdersAndProducts,
	getCartByUser,
	getAllCartsByUser,
	getCartByOrderId,
};
