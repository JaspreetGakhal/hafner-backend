// routes/contact.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

router.post('/', async (req, res) => {
  const { name, email, phone, serviceType, city, location, message } = req.body;

  console.log("✅ Incoming form submission:", req.body); // LOG

  try {
    await pool.query(
      `INSERT INTO customers (full_name, email, phone, service_type, city, postal_code, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, email, phone, serviceType, city, location, message]
    );

    console.log("✅ Inserted into DB");

    return res.status(200).json({ message: "✅ Form submitted successfully" });
  } catch (err) {
    console.error("❌ DB Insert Error:", err);
    return res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
