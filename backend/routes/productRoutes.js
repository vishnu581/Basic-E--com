import express from 'express'
import { createProducts, deleteProduct, getAllproducts, getSingleProduct, updateProduct } from '../controller/productController.js'
import { verifyUserAuth } from '../Middleware/userAuth.js'


const router = express.Router()

//route
router.route("/products").
get(verifyUserAuth,getAllproducts).
post(createProducts)
router.route("/products/:id").
put(updateProduct)
.delete(deleteProduct).
get(getSingleProduct)


export default router

