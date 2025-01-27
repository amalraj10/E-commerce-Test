const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { 
  addProduct, 
  getProducts,  
  getOneProduct,
  editProduct,
  searchProducts
} = require('../controllers/productController');
const verifyToken = require('../middleware/authentication');

// Route for adding a product
router.post('/addProduct', verifyToken, upload.array('images', 5), addProduct);

// Route for getting all products
router.get('/getProducts', verifyToken, getProducts);

// Route for getting a single product by ID
router.get('/getProduct/:id', verifyToken, getOneProduct);

// Route for editing a product
router.put('/editProduct/:id', verifyToken, upload.array('images', 5), editProduct);

// Route for searching products by name
router.get('/searchProducts', verifyToken, searchProducts);

module.exports = router;
