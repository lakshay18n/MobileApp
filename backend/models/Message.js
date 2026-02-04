// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderPhone: {
    type: String,
    required: true,
    index: true
  },
  receiverPhone: {
    type: String,
    required: true,
    index: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

// Compound index for efficient chat queries
// messageSchema.index({ senderPhone: 1, receiverPhone: 1, timestamp: -1 });
// messageSchema.index({ receiverPhone: 1, senderPhone: 1, timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema);