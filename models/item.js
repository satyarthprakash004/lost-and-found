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
  category: {
    type: String,
    enum: ['electronics', 'document', 'vehicle', 'pet', 'personal'],
    default: 'personal'
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isPoliceReport: {
    type: Boolean,
    default: false
  },
  // Specialized Fields
  imei: String,          // Electronics
  serialNumber: String,  // Electronics
  docType: String,       // Document (Aadhar, PAN, etc.)
  docNumber: String,     // Document ID
  regNumber: String,     // Vehicle (Plate Number)
  species: String,       // Pet
  breed: String          // Pet
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
