const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Catch-all error logging
process.on('uncaughtException', (err) => console.error('🔥 Uncaught Exception:', err));
process.on('unhandledRejection', (reason) => console.error('🔥 Unhandled Rejection:', reason));

// Middleware
app.use(cors());
app.use(express.json());

// REGISTER ROUTE
app.use('/api/customers', require('./routes/contact'));

// Test root
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🎉');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


module.exports = router;