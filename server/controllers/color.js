const Color = require('../models/color');

// Create Color 
const createColor = async (req, res) => {
    try {
      const color = Color.create(req.body)
      res.json(color);

    } catch (error) {
      console.error('Error creating color:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

// Get All Colors
const getColors = async (req, res) => {
  try {
      const colors = await Color.find();
      res.json(colors);
  } catch (error) {
      throw new Error(error)
  }
}

// Delete Color
const deleteColor = async (req, res) => {
  const { id } = req.params
  try {
      const deletedColor = await Color.findByIdAndDelete(id);
      res.json(deletedColor);
  } catch (error) {
      throw new Error(error)
  }
}



module.exports = {createColor, getColors, deleteColor};
