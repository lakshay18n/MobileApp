const express = require('express');
const router = express.Router();
const Profile = require('../models/DetailsSchema');

router.post('/filter', async (req, res) => {
  try {
    const {
      gender,
      manglik,
      gotra,
      zone,
      minPreferredAgeRange,
      maxPreferredAgeRange,
    } = req.body;

    let query = {};

    // 1. Gender must match
    if (gender) query.gender = gender;

    // 2. Manglik must match
    if (manglik) query.manglik = manglik;

    // 3. Zone match (skip if "All" or empty)
    if (zone && zone !== "All") {
      query.zone = zone;
    }

    // 4. Gotra exclusion (skip if "Any" or empty)
    if (gotra && gotra !== "Any") {
      query.gotra = { $ne: gotra };
    }

    // 5. Age range filter (stored as string in DB)
    if (minPreferredAgeRange && maxPreferredAgeRange) {
      query.age = {
        $gte: minPreferredAgeRange.toString(),
        $lte: maxPreferredAgeRange.toString(),
      };
    }

    const results = await Profile.find(query);
    res.json(results);
  } catch (err) {
    console.error('Error filtering profiles:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
