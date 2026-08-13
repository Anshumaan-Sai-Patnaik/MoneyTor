const express = require('express');
const router = express.Router();

const Holding = require("../models/holding");
const Position = require("../models/position");

router.get('/', (req, res) => {
  res.send("Hi");
});

router.get('/allHoldings', async (req, res) => {
  try {
    const data = await Holding.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/allPositions', async (req, res) => {
  try {
    const data = await Position.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;