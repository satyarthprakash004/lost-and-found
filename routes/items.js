const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.post('/', async (req, res) => {
  try {
    console.log(req.body); // dekho kya aa raha hai

    const { itemname, type, email, lostaddress, description } = req.body;

    if (!itemname || !type || !email) {
      return res.status(400).json({ error: 'itemname, type aur email required hai' });
    }

    const item = await Item.create({
      itemname,
      type,
      email,
      lostaddress,
      description
    });

    res.status(201).json({ message: 'Item posted!', item });

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