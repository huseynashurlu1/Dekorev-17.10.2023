const Product = require('../models/product');

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
            storeId
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
            storeId
        });

        await product.save();
        console.log(product);

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

const getProductForHome = async (req, res) => {
    try {
        const products = await Product.find({
            $or: [{ isVIP: true }, { viewCount: { $gt: 50 } }]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
}


// Get Product By Id
const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id).populate('categoryId')
        res.json(product);
    } catch (error) {
        throw new Error(error)
    }
}

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


module.exports = {createProduct, getProducts, getProductById, increaseView, getProductForHome, deleteProduct};
