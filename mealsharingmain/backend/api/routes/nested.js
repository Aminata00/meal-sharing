import express from "express";
import knex from "./database_client.js"; 

const nestedRouter = express.Router();


nestedRouter.get("/:meal_id/reviews", async (req, res) => {
  try {
    const { meal_id } = req.params;
  
    const reviews = await knex("Review").where("meal_id", meal_id).select("*");

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this meal" });
    }

    res.json({ data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default nestedRouter;
