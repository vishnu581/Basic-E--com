import express from 'express'
import { createProducts, getAllproducts, updateProduct } from '../controller/productController.js'
const router = express.Router()

//route
router.route("/products").get(getAllproducts).post(createProducts)
router.route("/products/:id").put(updateProduct)


export default router

