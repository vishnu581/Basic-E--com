import express from 'express'
import { createProducts, deleteProduct, getAllproducts, getSingleProduct, updateProduct } from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../Middleware/userAuth.js'


const router = express.Router()

//route
router.route("/products").
get(verifyUserAuth,getAllproducts).
post(verifyUserAuth,roleBasedAccess('admin'), createProducts)

router.route("/products/:id").
put(verifyUserAuth,roleBasedAccess('admin'),updateProduct)
.delete(verifyUserAuth,roleBasedAccess('admin'),deleteProduct).
get(verifyUserAuth,getSingleProduct)


export default router

