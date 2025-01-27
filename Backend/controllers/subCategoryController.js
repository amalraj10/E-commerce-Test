const SubCategory = require('../models/SubCategory');

exports.addSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    
    res.status(201).json({
      success: true,
      subCategory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate('category', 'name');
    
    res.status(200).json({
      success: true,
      count: subCategories.length,
      subCategories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.categoryId })
      .populate('category', 'name');
    
    res.status(200).json({
      success: true,
      count: subCategories.length,
      subCategories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};