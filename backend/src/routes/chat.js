const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const Message = require('../models/Message'); 
const User = require('../models/User'); 

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll({
      attributes: ['id', 'content', 'username', 'createdAt'], 
      order: [['createdAt', 'ASC']], 
      limit: 100,
      raw: true 
    });
    
    // Format response consistently
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to load messages' 
    });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { content, username = 'Anonymous' } = req.body;
    console.log('Content:', content, 'Username:', username); // Log extracted data
    const message = await Message.create({
      content,
      username,
      is_archived: false
    });
console.log(message);
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save message'
    });
  }
});

module.exports = router;
