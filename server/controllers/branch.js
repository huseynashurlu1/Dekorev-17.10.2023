const Branch = require('../models/branch');
const Store = require('../models/store');

// Create Branch 
const createBranch = async (req, res) => {
    try {
      const branch = Branch.create(req.body)
      res.json(branch);

    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

// Get all branches 
const getBranches = async (req, res) => {
  try {
    const branchesPromise = Branch.find();
    const storesPromise = Store.find();
    const [branches, stores] = await Promise.all([branchesPromise, storesPromise])
    
    const datas = {
      branches: branches,
      stores: stores
    }
    res.json(datas)
  } catch (error) {
    console.error('Error getting branches:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Branch By Id
const getBranchById = async (req, res) => {
  const { id } = req.params;
try {
    const branch = await Branch.findById(id);
    res.json(branch);
} catch (error) {
    throw new Error(error)
}
}

// Get All Branches
const getAllBranchesByStoreId = async (req, res) => {
    const { id } = req.params;
  try {
      const branches = await Branch.find({storeId: id});
      res.json(branches);
  } catch (error) {
      throw new Error(error)
  }
}

// Update Branch
const updateBranch = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    await branch.updateOne(updateData);
    res.status(200).json({ message: 'Branch updated successfully', data: branch });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the branch.' });
  }
};


// Delete Branch
const deleteBranch = async (req, res) => {
  const { id } = req.params
  try {
      const deletedBranch = await Branch.findByIdAndDelete(id);
      res.json(deletedBranch);
  } catch (error) {
      throw new Error(error)
  }
}



module.exports = {createBranch, getAllBranchesByStoreId, getBranches,getBranchById,updateBranch, deleteBranch};
