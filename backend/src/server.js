import express from "express";
import pool from "./config/db.js";

const app = express();
app.use(express.json());

app.get("/home", async (req, res) => {
  try {
    const [sections] = await pool.query(
      "SELECT id, title FROM sections"
    );

    const result = {};

    for (const section of sections) {
      const [places] = await pool.query(
        `
        SELECT 
          p.id,
          p.title,
          p.location,
          p.rating,
          (
            SELECT image_url
            FROM place_images pi
            WHERE pi.place_id = p.id
            LIMIT 1
          ) AS image
        FROM places p
        WHERE p.section_id = ?
        `,
        [section.id]
      );

      result[section.title] = places;
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get place basic details
    const [places] = await pool.query(
      `
      SELECT id, title, location, rating, description
      FROM places
      WHERE id = ?
      `,
      [id]
    );

    if (places.length === 0) {
      return res.status(404).json({ message: "Place not found" });
    }

    const place = places[0];

    // 2. Get all images for this place
    const [images] = await pool.query(
      `
      SELECT image_url
      FROM place_images
      WHERE place_id = ?
      `,
      [id]
    );

    place.images = images.map((img) => img.image_url);

    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running");
});