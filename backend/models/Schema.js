const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
}, { collection: 'accounts' }); // <-- This ensures the collection is named 'accounts'

module.exports = mongoose.model('Account', accountSchema);