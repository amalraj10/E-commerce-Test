const express = require('express');
const router = express.Router();
const { 
  addSubCategory,
  getSubCategories,
  getSubCategoriesByCategory
} = require('../controllers/subCategoryController');
const verifyToken = require('../middleware/authentication');

router.post('/addSubCategory', verifyToken, addSubCategory);    
router.get('/getSubCategories', verifyToken, getSubCategories);
router.get('/getSubCategories/:categoryId', verifyToken, getSubCategoriesByCategory);

module.exports = router;