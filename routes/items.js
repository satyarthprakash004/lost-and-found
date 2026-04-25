const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { sendMatchEmail } = require('../utils/mailer');

router.post('/', async (req, res) => {
  try {
    const { itemname, type, email, lostaddress, description } = req.body;

    if (!itemname || !type || !email) {
      return res.status(400).json({ error: 'itemname, type and email are required' });
    }

    const item = await Item.create({
      itemname,
      type,
      email,
      lostaddress,
      description
    });

    // Simple matching logic
    const matchType = type === 'lost' ? 'found' : 'lost';
    const potentialMatch = await Item.findOne({
      itemname: { $regex: new RegExp(`^${itemname}$`, 'i') },
      type: matchType,
      status: 'open'
    });

    if (potentialMatch) {
      console.log(`Match found for ${itemname}!`);
      const ownerEmail = type === 'lost' ? email : potentialMatch.email;
      const founderEmail = type === 'found' ? email : potentialMatch.email;
      
      // Send email (async, don't wait for it to block response)
      sendMatchEmail(ownerEmail, founderEmail, itemname);
    }

    res.status(201).json({ message: 'Item posted!', item, matchFound: !!potentialMatch });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'item not found' });
    }
    res.json(item)
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.patch('/:id/claim', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)  // kya bharoge?
    if (!item) {
      return res.status(404).json({ error: 'item not found' })
    }           // item nahi mila?
    if (item.status === 'claimed') { return res.status(400).json({ error: 'item already claimed' }) } // already claimed?
    item.status = 'claimed'  // kya set karoge?
    await item.save()
    return res.json({ message: 'item claimed successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;