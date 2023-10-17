const Product = require('../models/product');
const Store = require('../models/store');

// Create a new Product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            phone,
            isDiscounted,
            discountedPrice,
            isNew,
            isVIP,
            hasShipping,
            city,
            categoryId,
            storeId,
            colorId
        } = req.body;

        const images = req.files.map(file => ({ url: file.filename, isMain: false }));
        const product = new Product({
            name,
            description,
            price,
            phone,
            images: images,
            isDiscounted,
            discountedPrice,
            isNew,
            isVIP,
            hasShipping,
            city,
            categoryId,
            storeId,
            colorId
        });

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('storeId')
        res.json(products);
    } catch (error) {
        throw new Error(error)
    }
}

// Search products by name
const searchProductsByName = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const products = await Product.find({
            name: { $regex: searchQuery, $options: 'i' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching products.' });
    }
}


const getProductForHome = async (req, res) => {
    try {
        const [products, storeImages] = await Promise.all([
            Product.find({
                $or: [{ isVIP: true }, { viewCount: { $gt: 50 } }]
            })
            .sort({ createDate: -1 })
            .limit(20),

            Store.find({}, 'image')
            .sort({ createDate: -1 }) 
            .limit(8)
        ]);

        res.json({
            products: products,
            storeImages: storeImages
        });
    } catch (error) {
        console.error("Error fetching products and stores for home:", error);
        res.status(500).json({ error: 'An error occurred while fetching products and stores for home.' });
    }
}



// Get Product By Id
const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id).populate('categoryId').populate('storeId');
        res.json(product);
    } catch (error) {
        throw new Error(error)
    }
}

const getSortOption = (sortType) => {
    switch(sortType) {
        case "1": return { name: 1 };
        case "2": return { name: -1 };
        case "3": return { price: 1 };
        case "4": return { price: -1 };
        default: return {};
    }
};

const getProductsByCategoryId = async (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortType = req.query.sort || "0"; 

    try {
        const query = { categoryId: id };
        
        if (["3", "4"].includes(sortType)) {
            query.price = { $exists: true, $ne: null };
        }

        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / perPage);
        const skip = (page - 1) * perPage;

        const products = await Product.find(query)
            .select('name price isDiscounted discountedPrice images createDate')
            .populate('colorId')
            .sort(getSortOption(sortType))
            .skip(skip)
            .limit(perPage);

        res.json({
            products,
            page,
            totalPages,
            totalCount,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products by category ID.' });
    }
};

const getProductsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.find({'ownerId': id});
        const products = await Product.find({storeId: store[0]._id}).populate('storeId');
        res.json(products);
       
    } catch (error) {
        console.error("Error fetching products by user ID:", error);
        res.status(500).json({ error: 'An error occurred while fetching products by user ID.' });
    }
};

// const getProductsByUserId = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const products = await Product.find().populate('storeId')
//         const filtered = products.filter(item => (item.storeId.ownerId).toString() === id)
//         res.json(filtered);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while fetching products by user ID.' });
//     }
// };


// Delete Product
const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        res.json(product);
    } catch (error) {
        throw new Error(error)
    }
}


// Increase Product View
const increaseView = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true });

        res.json({ product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the view count.' });
    }
}


module.exports = {createProduct, getProducts, getProductsByCategoryId, getProductById, increaseView, getProductForHome, deleteProduct, searchProductsByName, getProductsByUserId};
