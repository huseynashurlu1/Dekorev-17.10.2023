const User = require('../models/user');

const jwt = require('jsonwebtoken');
const secretKey = 'devlife85***';

const createUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
    
        const user = new User({
          username,
          email,
          password,
        });
    
        await user.save();
    
        res.status(201).json({ message: 'Qeydiyyat uğurla tamamlandı.' });
      } catch (error) {
        console.error('Qeydiyyat zamanı səhv baş verdi:', error);
      res.status(500).json({ error: 'Bir səhv baş verdi.', message: error.message });

    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'İstifadəçi tapılmadı.' });
    }

    // JWT token yaratmaq
    const token = jwt.sign({ userId: user._id, userRole: user.role }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Bir səhv baş verdi.' });
  }
}

const checkLogin = async (req,res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    try {
      const decoded = jwt.verify(token, 'devlife85***'); 
      const userId = decoded.userId;
  
      const user = await User.findById(userId);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: 'Token səhvdir və ya müddəti bitib.' });
    }
}

// Get All User
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      throw new Error(error)
  }
}

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
      const user = await User.findByIdAndDelete(id);
      res.json(user);
  } catch (error) {
      throw new Error(error)
  }
}

  module.exports = {createUser, loginUser, checkLogin, getAllUsers, deleteUser};