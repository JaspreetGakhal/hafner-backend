const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('✅ Form submission received:', req.body);

    // TEMP: just simulate a success without DB or email
    return res.status(200).json({ message: 'Success: Dummy handler active' });
  } catch (err) {
    console.error('❌ Server crash:', err);
    return res.status(500).json({ message: 'Internal Error' });
  }
});

module.exports = router;
