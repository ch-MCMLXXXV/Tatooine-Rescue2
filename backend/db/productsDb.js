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
         [
            name,
            description,
            adoption_fee,
            quantity,
            breed,
            image,
            isActive,
         ]
      );
      console.log(products);
      return products;
   } catch (error) {
      throw error;
   }
}

async function getAllProducts() {
   try {
      console.log('is this working?');
      const { rows: products } = await client.query(`
        SELECT *
        FROM products
        `);
      console.log('is this working?');
      return products;
   } catch (error) {
      console.log(error);
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
   description,
   isActive,
}) {
   try {
      const { rows: products } = await client.query(
         `
            UPDATE products
            SET name = $1,
            adoption_fee= $2,
            quantity = $3,
            breed = $4,
            image = $5,
            description = $7,
            "isActive" = $8
            WHERE id = $6;
        `,
         [name, adoption_fee, quantity, breed, image, id, description, isActive]
      );
      return products;
   } catch (error){console.log(error)}
}

async function deleteProducts(id) {
	try {
		const { rows: products } = await client.query(
			`
        DELETE FROM products
        WHERE "id" = $1
        `,
			[id]
		);
      console.log(id, "This is productDb in backend")
		return products;
	} catch (error) {
		throw error;
	}
}

module.exports = {
   createProducts,
   getAllProducts,
   getProductsById,
   getProductsByCategory,
   updateProducts,
   deleteProducts
};
