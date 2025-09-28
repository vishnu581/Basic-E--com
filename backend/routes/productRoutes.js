import express from 'express'
import { createProducts, deleteProduct, getAllproducts, getSingleProduct, updateProduct } from '../controller/productController.js'
const router = express.Router()

//route
router.route("/products").
get(getAllproducts).
post(createProducts)
router.route("/products/:id").
put(updateProduct)
.delete(deleteProduct).
get(getSingleProduct)


export default router

