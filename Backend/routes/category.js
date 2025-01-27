const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication');
const { 
  addCategory,
  getCategories
} = require('../controllers/categoryController');

router.post('/addCategory', verifyToken, addCategory);
router.get('/getCategories', verifyToken, getCategories);

module.exports = router;