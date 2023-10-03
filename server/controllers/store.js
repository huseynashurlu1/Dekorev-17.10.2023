const Store = require('../models/store');

// Create a new Store
const createStore = async (req, res) => {
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).send('No file uploaded.');
        }

        const {
            name,
            description,
            address,
            phone,
            workHours,
            ownerId
        } = req.body;

       

        const store = new Store({
            name,
            image: uploadedFile.filename,
            description,
            address,
            phone,
            workHours,
            ownerId
        });

        await store.save();

        res.status(201).json({ message: 'Store created successfully', store });
    } catch (error) {
        res.status(500).json({ error: 'Error creating store', details: error.message });
    }
};

// Get All Stores
const getStores = async (req, res) => {
    try {
        const stores = await Store.find().populate('statusId')
        
        if (!stores) {
            return res.status(404).json({ message: 'Stores not found' });
        }

        const storeWithProducts = await Store.aggregate([
            {
                $lookup: {
                    from: 'products', 
                    localField: '_id',
                    foreignField: 'storeId',
                    as: 'products'
                }
            }
       ]);


        if (stores.length === 0) {
          return res.status(404).json({ message: 'Mağazalar tapılmadı' });
        }
        res.json(storeWithProducts);

    } catch (error) {
        throw new Error(error)
    }
}

const getStoreById = async (req, res) => {
    const { id } = req.params;
   
    try {
        const store = await Store.findById(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const storeWithProducts = await Store.aggregate([
            { $match: { _id: store._id } },
            {
                $lookup: {
                    from: 'products', 
                    localField: '_id',
                    foreignField: 'storeId',
                    as: 'products'
                }
            }
       ]);


        if (store.length === 0) {
          return res.status(404).json({ message: 'Mağaza bulunamadı' });
        }

        res.json(storeWithProducts[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the store.' });
    }
}

// Delete Store
const deleteStore = async (req, res) => {
    const { id } = req.params
    try {
        const deletedStore = await Store.findByIdAndDelete(id);
        res.json(deletedStore);
    } catch (error) {
        throw new Error(error)
    }
  }




// Increase Product View
const increaseView = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedStore = await Store.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true });

        res.json({ store: updatedStore });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the view count.' });
    }
}


module.exports = {createStore, getStores, getStoreById, deleteStore, increaseView};
