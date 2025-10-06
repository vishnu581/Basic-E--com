import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../Middleware/userAuth.js'
import { allMyorders, createNewOrder, deleteOrder, getAllOrders, getSingelOrder, updateOrderStatus } from '../controller/orderController.js'

const router=express.Router()


router.route('/new/order').post(verifyUserAuth,createNewOrder)
router.route('/admin/order/:id').get(verifyUserAuth,roleBasedAccess('admin'),getSingelOrder).put(
verifyUserAuth,roleBasedAccess('admin'),updateOrderStatus).delete(verifyUserAuth,roleBasedAccess('admin'),deleteOrder)
router.route('/admin/orders').get(verifyUserAuth,roleBasedAccess('admin'),getAllOrders)
router.route('/orders/user').get(verifyUserAuth,allMyorders)







export default router