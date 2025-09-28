import express from 'express'
import errorHandelMiddleware from "./Middleware/error.js"

import product from './routes/productRoutes.js'
const app = express()

//middelware

app.use(express.json())

//route
app.use("/api/v1",product)

app.use(errorHandelMiddleware)
export default app


