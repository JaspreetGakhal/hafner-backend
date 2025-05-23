const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('✅ Form submission received:', req.body);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('❌ Error handling request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
