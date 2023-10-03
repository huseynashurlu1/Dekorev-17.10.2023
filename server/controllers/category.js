const Category = require('../models/category');
const fs = require('fs');
const path = require('path');

// Create Category 
const createCategory = async (req, res) => {
    try {
      const { name } = req.body;

      const uploadedFile = req.file;
      if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
      }
  
      const newCategory = new Category({
        name,
        image: uploadedFile.filename
      })
  
      const savedCategory = await newCategory.save();
  
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
      const categories = await Category.find();
      res.json(categories);
  } catch (error) {
      throw new Error(error)
  }
}

// Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      res.json(deletedCategory);
  } catch (error) {
      throw new Error(error)
  }
}



module.exports = {createCategory, getAllCategories, deleteCategory};
