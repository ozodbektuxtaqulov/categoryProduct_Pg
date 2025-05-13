import db from "../db/index.js";

export class CategoryController {
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const result = await db.query(
        "INSERT INTO categories(name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
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

  async getAllCategories(_, res) {
    try {
      const result = await db.query("SELECT * FROM categories");
      return res.status(200).json({
        statusCode: 200,
        message: "succcess",
        data: result?.rows,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async getCategoryById(req, res) {
    try {
      const result = await db.query("SELECT * FROM categories WHERE id = $1", [
        req.params.id,
      ]);
      if (!result?.rows[0]) {
        return res.status(404).json({
          error: "categories not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result?.rows[0],
      });
    } catch (error) {
      return res.status(200).json({
        error: error.message,
      });
    }
  }

  async updateCategoryById(req, res) {
    try {
      const result = await db.query(
        "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [req.body.name, req.body.description, req.params.id]
      );
      if (!result) {
        return res.status(400).json({
          error: "Error on updating categories",
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

  async deleteCategoryById(req, res) {
    try {
      const result = await db.query(
        "DELETE FROM categories WHERE id = $1 RETURNING *",
        [req.params.id]
      );
      if(!result?.rows[0]){
        return res.status(400).json({
          error: "Error on deleting categories",
        });
      }
      return res.status(200).json({
        statusCode: 201,
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
