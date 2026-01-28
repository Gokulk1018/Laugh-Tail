import express from "express";
import pool from "./src/config/db.js";

const app = express();

app.get("/db-status", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "connected" });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running");
});