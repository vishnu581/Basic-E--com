import express from 'express'
import errorHandelMiddleware from "./Middleware/error.js"
import user from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'
import product from './routes/productRoutes.js'
const app = express()

//middelware

app.use(express.json())
app.use(cookieParser())

//route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

app.use(errorHandelMiddleware)
export default app


