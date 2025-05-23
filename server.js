const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const router = require('./routes/contact'); // ✅ FIX: define the router
app.use('/api/customers', router);

// Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  app.get('/', (req, res) => {
  res.send('✅ Hafner backend is running.');
});

});

