const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    default: 'lost'
  },
  status: {
    type: String,
    enum: ['open', 'claimed'],
    default: 'open'
  },
  email: {
    type: String,
    required: true
  },
  lostaddress: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
