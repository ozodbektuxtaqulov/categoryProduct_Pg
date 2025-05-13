import db from "../db/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const { name, price, quantity, category_id } = req.body;
      const category = await db.query(
        "SELECT id FROM categories WHERE id = $1",
        [category_id]
      );
      if (!category?.rows[0]) {
        return res.status(404).json({
          error: `category not found ${category_id}`,
        });
      }

      const result = await db.query(
        "INSERT INTO products (name, price, quantity, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, price, quantity, category_id]
      );
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: result?.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getAllProducts(_, res) {
    try {
      const result = await db.query("SELECT * FROM products");
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const result = await db.query("SELECT * FROM products WHERE id=$1", [
        req.params.id,
      ]);
      if (!result?.rows[0]) {
        return res.status(404).json({
          error: "Product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async updateProductById(req, res) {
    try {
      const { name, price, quantity, category_id } = req.body;
      const category = await db.query(
        "SELECT id FROM categories WHERE id = $1",
        [category_id]
      );
      if (!category?.rows[0]) {
        return res.status(404).json({
          error: `category not found ${category_id}`,
        });
      }
      const result = db.query(
        "UPDATE products SET name = $1, price = $2, quantity = $3, category_id =$4 WHERE id = $5 RETURNING *",
        [name, price, quantity, category_id, req.params.id]
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async deleteProductById(req, res) {
    try {
        const result = await db.query(
          "DELETE FROM products WHERE id = $1, [req.params.id]"
        );
        if (!result?.rows[0]) {
          return res.status(404).json({
            error: "product not found",
          });
        }
        return res.status(200).json({
          ststusCode: 200,
          message: "success",
          data: {},
        });

    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
