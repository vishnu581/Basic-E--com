import express from 'express'

import product from './routes/productRoutes.js'
const app = express()

//middelware

app.use(express.json())

//route
app.use("/api/v1",product)
export default app
