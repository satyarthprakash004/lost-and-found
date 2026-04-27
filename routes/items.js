const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { sendMatchEmail } = require('../utils/mailer');
const { protect, optionalProtect } = require('../utils/auth');

router.post('/', optionalProtect, async (req, res) => {
  try {
    const { 
      itemname, type, email, lostaddress, description, 
      category, imei, serialNumber, docType, docNumber, regNumber, species, breed, isPoliceReport 
    } = req.body;

    if (!itemname || !type || !email) {
      return res.status(400).json({ error: 'itemname, type and email are required' });
    }

    const itemData = {
      itemname, type, email, lostaddress, description, 
      category, imei, serialNumber, docType, docNumber, regNumber, species, breed, isPoliceReport
    };

    if (req.user) {
      itemData.userId = req.user._id;
    }

    const item = await Item.create(itemData);

    // Matching Logic: Prioritize Unique Identifiers
    const matchType = type === 'lost' ? 'found' : 'lost';
    let matchQuery = { type: matchType, status: 'open' };

    // Smart Matching based on category
    if (category === 'electronics' && (imei || serialNumber)) {
      matchQuery.$or = [{ imei: imei }, { serialNumber: serialNumber }];
    } else if (category === 'document' && docNumber) {
      matchQuery.docNumber = docNumber;
    } else if (category === 'vehicle' && regNumber) {
      matchQuery.regNumber = regNumber;
    } else if (category === 'pet' && (breed || species)) {
      matchQuery.species = species;
      matchQuery.breed = breed;
    } else {
      // Fallback to name regex for personal items or missing IDs
      matchQuery.itemname = { $regex: new RegExp(`^${itemname}$`, 'i') };
    }

    const potentialMatch = await Item.findOne(matchQuery);

    if (potentialMatch) {
      console.log(`Match found for ${itemname}!`);
      const ownerEmail = type === 'lost' ? email : potentialMatch.email;
      const founderEmail = type === 'found' ? email : potentialMatch.email;
      sendMatchEmail(ownerEmail, founderEmail, itemname);
    }

    res.status(201).json({ message: 'Item posted!', item, matchFound: !!potentialMatch });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/claim', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'item not found' });
    if (item.status === 'claimed') return res.status(400).json({ error: 'item already claimed' });
    
    item.status = 'claimed';
    await item.save();
    return res.json({ message: 'item claimed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;