const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    // Handle the uploaded files
    const imagesPaths = req.files.map(file => `/uploads/${file.filename}`);
    
    // Create product with image paths
    const productData = {
      ...req.body,
      images: imagesPaths
    };

    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    
    // Add category filter if provided in query
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Add subcategory filter if provided in query
    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const products = await Product.find(filter)
      .populate('category')
      .populate('subCategory');
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('subCategory');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    let productData = { ...req.body };
    
    // Handle new uploaded files if any
    if (req.files && req.files.length > 0) {
      const newImagesPaths = req.files.map(file => `/uploads/${file.filename}`);
      // If images are provided in the request, update them
      productData.images = newImagesPaths;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    ).populate('category')
      .populate('subCategory');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    // Create a case-insensitive regex search pattern
    const searchPattern = new RegExp(query, 'i');
    
    const products = await Product.find({ title: searchPattern })
      .populate('category')
      .populate('subCategory');
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};