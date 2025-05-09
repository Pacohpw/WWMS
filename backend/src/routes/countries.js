const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const Country = require('../models/Country');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const countries = await Country.findAll();
    if (!countries) return res.status(404).json({ error: 'cccCountry not found' });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'cccFailed to fetch countries' });
  }
});

router.get('/name/:countryName', authenticateToken, async (req, res) => {
  try {
      const { countryName } = req.params;
      console.log('Requested country name:', countryName);
      const country = await Country.findOne({ where: { name: countryName } });
      if (!country) return res.status(404).json({ error: 'abCountry not found' });
      res.json(country);
  } catch (error) {
      res.status(500).json({ error: 'abFailed to fetch country data' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== 'admin' && req.user.countryid !== parseInt(id)) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const country = await Country.findByPk(id);
    if (!country) return res.status(404).json({ error: 'Country not found' });

    await country.update(req.body);
    res.json({ message: 'Country updated', country });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update country' });
  }
});

module.exports = router;