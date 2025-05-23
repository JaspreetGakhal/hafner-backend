const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ This connects to your existing route logic in routes/contact.js
app.use('/api/customers', require('./routes/contact'));

// ✅ Optional route to check backend is alive
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🎉');
});

// ✅ Start the server on the Render-assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
