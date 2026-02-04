const express = require('express');
const router = express.Router();
const Account = require('../models/Schema');
const bcrypt = require('bcryptjs');

router.get('/test', (req,res)=>{
    res.json({done:"Request meted"})
})

router.post('/signup', async (req, res) => {
  const { phone, password, firstName, lastName } = req.body;
  try {
    const existingUser = await Account.findOne({ phone });
    if (existingUser) return res.status(400).json({ error: 'Phone already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Account({ phone, password: hashedPassword, firstName, lastName });
    await user.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await Account.findOne({ phone });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




router.get('/user/:phone', async (req, res) => {
  const phone = req.params.phone; // ✅ Get phone number from URL
  try {
    const user = await Account.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't send password in response
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;


// router.get('/add', async (req, res) => {
//   const mockUsers = [
//     {
//       phone: '12333333',
//       password: '123333',
//       firstName: 'Johffffffn',
//       lastName: 'Doggggge',
//     },
//     {
//       phone: '098733',
//       password: 's63333',
//       firstName: 'dde',
//       lastName: 'Smddddddddd',
//     },
//   ];

//   try {
//     const results = [];
//     for (const user of mockUsers) {
//       const newUser = new Account({
//         phone: user.phone,
//         password: user.password, // Store password as plain text
//         firstName: user.firstName,
//         lastName: user.lastName,
//       });
//       await newUser.save();
//       results.push({ phone: user.phone, status: 'added' });
//     }
//     res.json({ message: 'Mock data inserted successfully', results });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to insert mock data', details: err.message });
//   }
// });