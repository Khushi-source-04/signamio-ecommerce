// src/controllers/productController.js - Product Controller

const Product = require('../models/Product');

// Get all products with filters
exports.getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, sort, page = 1, limit = 20 } = req.query;

    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query['price.sellingPrice'] = {};
      if (minPrice) query['price.sellingPrice'].$gte = Number(minPrice);
      if (maxPrice) query['price.sellingPrice'].$lte = Number(maxPrice);
    }

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query
    let queryExec = Product.find(query);

    // Sorting
    if (sort === 'latest') {
      queryExec = queryExec.sort({ createdAt: -1 });
    } else if (sort === 'price-low') {
      queryExec = queryExec.sort({ 'price.sellingPrice': 1 });
    } else if (sort === 'price-high') {
      queryExec = queryExec.sort({ 'price.sellingPrice': -1 });
    } else if (sort === 'rating') {
      queryExec = queryExec.sort({ 'rating.average': -1 });
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    queryExec = queryExec.skip((pageNum - 1) * limitNum).limit(limitNum);

    const products = await queryExec;
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        products,
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
