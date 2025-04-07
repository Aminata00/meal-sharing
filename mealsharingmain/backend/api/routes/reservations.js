import express from "express";
import knex from "./database_client.js"; 

const reservationRouter = express.Router();


reservationRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex("Reservation").select("*");
    res.json({ data: reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


reservationRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await knex("Reservation").where("id", id).first();

    if (!reservation) return res.status(404).json({ error: "Reservation not found" });

    res.json({ data: reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

reservationRouter.post("/", async (req, res) => {
  try {
    const newReservation = req.body;
    const [id] = await knex("Reservation").insert(newReservation);

    res.status(201).json({ message: "Reservation added successfully", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


reservationRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = req.body;

    const updated = await knex("Reservation").where("id", id).update(updatedReservation);

    if (updated === 0) return res.status(404).json({ error: "Reservation not found" });

    res.json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


reservationRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await knex("Reservation").where("id", id).del();

    if (deleted === 0) return res.status(404).json({ error: "Reservation not found" });

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default reservationRouter;
