const Status = require('../models/status');

// Create Status 
const createStatus = async (req, res) => {
    try {
      const status = Status.create(req.body)
      res.json(status);
    } catch (error) {
      console.error('Error creating status:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

// Get All Status
const getAllStatus = async (req, res) => {
  try {
      const status = await Status.find();
      res.json(status);
  } catch (error) {
      throw new Error(error)
  }
}

// Delete Status
const deleteStatus = async (req, res) => {
  const { id } = req.params
  try {
      const deletedStatus = await Status.findByIdAndDelete(id);
      res.json(deletedStatus);
  } catch (error) {
      throw new Error(error)
  }
}



module.exports = {createStatus, getAllStatus, deleteStatus};
