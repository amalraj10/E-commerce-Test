const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    
    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};