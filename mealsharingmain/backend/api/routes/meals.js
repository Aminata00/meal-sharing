import express from "express";
import knex from "backend/database_client.js"; 

const mealsRouter = express.Router();
import nestedRouter from "./nested.js"; 
mealsRouter.use("/", nestedRouter);


mealsRouter.get("/", (req, res) => {
  res.send("<h1>Welcome to the meal page!</h1>");
});


mealsRouter.get("/all", async (req, res) => {
  try {
    let query = knex("Meal");

    if (req.query.maxPrice) {
      query = query.where("price", "<=", Number(req.query.maxPrice));
    }

    if (req.query.availableReservations) {
      query = query.where("available_spots", req.query.availableReservations === "true" ? ">" : "=", 0);
    }

    if (req.query.title) {
      query = query.where("title", "like", `%${req.query.title}%`);
    }

    if (req.query.dateAfter) {
      query = query.where("when", ">", req.query.dateAfter);
    }

    if (req.query.dateBefore) {
      query = query.where("when", "<", req.query.dateBefore);
    }

    if (req.query.sortKey && ["price", "max_reservations", "when"].includes(req.query.sortKey)) {
      const sortDir = req.query.sortDir === "desc" ? "desc" : "asc";
      query = query.orderBy(req.query.sortKey, sortDir);
    }

    if (req.query.limit) {
      query = query.limit(Number(req.query.limit));
    }

    const meals = await query;
    res.json({ data: meals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("Meal").orderBy("created_date", "asc").first();
    if (!firstMeal) return res.status(404).json({ error: "No meals found" });
    res.json({ data: firstMeal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex("Meal").orderBy("created_date", "desc").first();
    if (!lastMeal) return res.status(404).json({ error: "No meals found" });
    res.json({ data: lastMeal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex("Meal").where("when", ">", knex.fn.now());
    res.json({ data: meals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await knex("Meal").where("id", id).first();
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json({ data: meal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


mealsRouter.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const [id] = await knex("Meal").insert(newMeal);
    res.status(201).json({ message: "Meal added successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMeal = req.body;
    const updated = await knex("Meal").where("id", id).update(updatedMeal);
    if (updated === 0) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await knex("Meal").where("id", id).del();
    if (deleted === 0) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default mealsRouter;
