const { addProductToCart } = require('./cart');
const client = require('./client');

async function createOrders({
   userId,
   purchaseComplete,
   adoption_fee,
   productId,
}) {
   try {
      const existingOrder = await getUsersCart(userId);
      console.log(existingOrder, 'existing order');
      let order = {};
      if (existingOrder?.length > 0) {
         order = existingOrder[0];
      } else {
         const { rows } = await client.query(
            `
           INSERT INTO orders ("userId", "purchaseComplete", adoption_fee)
           VALUES($1, $2, $3)
           RETURNING *;
           `,
            [userId, purchaseComplete, adoption_fee]
         );
         order = rows[0];
      }

      await addProductToCart({
         orderId: order.id,
         adoption_fee,
         productId,
         quantity: 1,
      });
      return order;
   } catch (error) {
      throw error;
   }
}

async function getAllOrdersByUserId({ userId }) {
   try {
      const { rows: orders } = await client.query(
         `
        SELECT orders.*, users.username
        FROM orders
        JOIN users ON orders."userId" = users.id
        WHERE "userId" = $1;
        `,
         [userId]
      );
      return orders;
   } catch (error) {
      throw error;
   }
}

async function getAllCompletedOrdersByUserId({ userId }) {
   try {
      const { rows: orders } = await client.query(
         `
        SELECT *
        FROM orders
        WHERE "userId" = $1     AND
        "purchaseComplete" = true;
        `,
         [userId]
      );

      return orders;
   } catch (error) {
      throw error;
   }
}

async function attachProductsToOrder(orderId) {
   try {
      const { rows } = await client.query(
         `SELECT products.name, products.id, products.breed, products.adoption_fee, products.image, cart.quantity
         FROM products
         Join cart ON products.id = cart."productId"
         WHERE cart."orderId" = $1
         `,
         [orderId]
      );
      return rows;
   } catch (error) {
      throw error;
   }
}
async function getOrderById(id) {
   try {
      const {
         rows: [order],
      } = await client.query(
         `
        SELECT *
        FROM orders
        WHERE id = $1;
        `,
         [id]
      );
      order.products = await attachProductsToOrder(order.id);
      return order;
   } catch (error) {
      throw error;
   }
}

async function getUsersCart(userId) {
   console.log(userId, 'userId');
   try {
      const { rows: cart } = await client.query(
         `
        SELECT *
        FROM orders
        WHERE "userId" = $1 AND "purchaseComplete" = false;
        `,
         [userId]
      );
      return cart;
   } catch (error) {
      throw error;
   }
}

async function deleteUsersCart(userId) {
   try {
      const { rows: cart } = await client.query(
         `
        DELETE FROM orders
        WHERE "userId" = $1 AND
        "purchaseComplete" = false;
        `,
         [userId]
      );
      return cart;
   } catch (error) {
      throw error;
   }
}

async function deleteOrder(orderId) {
   try {
      const { rows: order } = await client.query(
         `
        DELETE FROM orders
        WHERE id=$1
        RETURNING *;
        `,
         [orderId]
      );
      return order;
   } catch (error) {
      throw error;
   }
}

async function getAllOrdersAsAdmin({ userId }) {
   try {
      const { rows: orders } = await client.query(
         `
        SELECT *
        FROM orders
        WHERE "purchaseComplete" = true;
        `,
         [userId]
      );
      return orders;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   createOrders,
   getAllOrdersByUserId,
   getOrderById,
   getUsersCart,
   deleteOrder,
   getAllOrdersAsAdmin,
   deleteUsersCart,
   getAllCompletedOrdersByUserId,
};
