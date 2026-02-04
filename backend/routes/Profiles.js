const express = require('express');
const router = express.Router();
const Profile = require('../models/DetailsSchema'); // adjust path as needed

router.post('/addprofile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(200).json({ message: 'Profile created successfully', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

module.exports = router;
