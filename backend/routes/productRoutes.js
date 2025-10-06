import express from 'express'
import { createProducts, deleteProduct, getAdminProducts, getAllproducts, getSingleProduct, updateProduct ,createReviewForProduct, getProductReviews, deleteReview} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../Middleware/userAuth.js'


const router = express.Router()

//route
router.route("/products").get(getAllproducts)
router.route("/products/:id").get(getSingleProduct)
router.route("/review").put(verifyUserAuth,createReviewForProduct)
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth,deleteReview)





router.route("/admin/products").
get(verifyUserAuth,roleBasedAccess('admin'),
getAdminProducts)


router.route("/admin/products/create").post(verifyUserAuth,roleBasedAccess('admin'), createProducts)

router.route("/admin/products/:id").put(verifyUserAuth,roleBasedAccess('admin'),updateProduct).
delete(verifyUserAuth,roleBasedAccess('admin'),deleteProduct).
get(getSingleProduct)



export default router

