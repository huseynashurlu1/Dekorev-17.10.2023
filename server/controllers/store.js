const Store = require('../models/store');
const Product = require('../models/product');
const Branch = require('../models/branch');
const Category = require('../models/category');

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

        if (!name || !description || !address || !phone || !workHours || !ownerId) {
            return res.status(400).json({ error: 'Incomplete store information' });
        }

       

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
        res.status(500).json({ error: error.message });
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
            {
                $match: { _id: store._id }
            },
            {
                $lookup: {
                    from: 'branches',
                    localField: '_id',
                    foreignField: 'storeId',
                    as: 'branches'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'storeId',
                    as: 'products'
                }
            }
       ]);
        if (!storeWithProducts || storeWithProducts.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }

        res.json(storeWithProducts[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the store and its branches and products.' });
    }
}

// Get Store Statistics
const getStatistics = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findOne({ ownerId: id }).select('viewCount');

        if (!store) {
            return res.status(404).send({ error: 'Store not found' });
        }

        const productsPromise = Product.find({ storeId: store._id }).count()
        const branchesPromise = Branch.find({ storeId: store._id }).count()

        const [products, branches] = await Promise.all([productsPromise, branchesPromise]);

        const statistics = {
            store: store,
            products: products,
            branches: branches
        }

        res.json(statistics);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// get Statistics for Admin
const getStatisticsForAdmin = async (req, res) => {
    try {
        const storePromise = Store.find().count()
        const branchPromise = Branch.find().count()
        const productPromise = Product.find().count()
        const categoryPromise = Category.find().count()

        const [stores, branches, products, categories] = await Promise.all([storePromise, branchPromise, productPromise, categoryPromise]);

        const statistics = {
            stores: stores,
            branches: branches,
            products: products,
            categories: categories,
        }

        res.json(statistics);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getCategoryProductCounts = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({ message: 'Kateqoriyalar tapılmadı' });
        }

        const categoryData = await Promise.all(categories.map(async (category) => {
            const productCount = await Product.countDocuments({ categoryId: category._id });
            console.log(productCount);
            return {
                name: category.name,
                count: productCount,
            };

        }));

        const totalProductCount = categoryData.reduce((total, category) => total + category.count, 0);

        const categoryPercentages = categoryData.map(category => ({
            name: category.name,
            percentage: (category.count / totalProductCount) * 100,
        }));

        res.json(categoryPercentages);
    } catch (error) {
        res.status(500).json({ error: 'Kateqoriyaların məhsul sayını hesablamaq mümkün olmadı.', details: error.message });
    }
}


const getProductsCountByStore = async (req, res) => {
    try {
        const stores = await Store.find(); 

        const productsCounts = await Promise.all(stores.map(async (store) => {
            const productCount = await Product.countDocuments({ storeId: store._id });
            return {
                storeName: store.name,
                productCount: productCount,
            };
        }));

        res.json(productsCounts);
        console.log(productsCounts);
    } catch (error) {
        res.status(500).json({ error: 'Mağazaların məhsul sayını hesablamaq mümkün olmadı.', details: error.message });
    }
}


// Delete Store
const deleteStore = async (req, res) => {
    const { id } = req.params
    try {
        const deletedStore = await Store.findByIdAndDelete(id);
        res.json(deletedStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
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


module.exports = {createStore, getStores, getStoreById, deleteStore, increaseView, getStatistics, getStatisticsForAdmin, getCategoryProductCounts, getProductsCountByStore};
