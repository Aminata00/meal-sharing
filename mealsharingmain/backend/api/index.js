import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mealsRouter from "./routes/meals.js"; 
import knex from "./database_clipimport express.js" ;
import reservationRouter from "./routes/reservations.js";

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = express.Router();

app.use(express.json());
app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api", apiRouter);

const meals = await knex.raw("SELECT * FROM Meal");
console.log(meals);
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
