const Settings = require('../models/settings');

// Create Settings
const createSettings = async (req, res) => {
    try {
      const { aboutText, phone, email, location } = req.body;

      const uploadedFile = req.file;
      if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
      }
  
      const newSettings = new Settings({
        aboutText,
        aboutImage:uploadedFile.filename, 
        phone,
        email,
        location
      });
  
      const savedSettings = await newSettings.save();
  
      res.status(201).json(savedSettings);
    } catch (error) {
      console.error('Error creating settings:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Get All Settings
const getSettings = async (req, res) => {
    try {
        const settings = await Settings.find();
        res.json(settings);
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {createSettings, getSettings };
