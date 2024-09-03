const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', authenticateToken, createProduct);
router.get('/:id', getProductById);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
