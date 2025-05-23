const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Neon.tech
});

// POST /api/customers
router.post('/customers', async (req, res) => {
  const { name, email, phone, serviceType, city, location, message } = req.body;

  try {
    // Save to PostgreSQL
    await pool.query(
      'INSERT INTO customers (name, email, phone, serviceType, city, location, message) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, email, phone, serviceType, city, location, message]
    );

    // Send email with nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Hafner Landscaping" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself
      subject: 'New Customer Contact Submission',
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Type:</strong> ${serviceType}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Postal Code:</strong> ${location}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
