import app from './app.js'
import  dotenv from 'dotenv'
import { connectMongoDatabase } from './config/db.js'
dotenv.config({path:'backend/config/config.env'})
const port = process.env.PORT || 3000

connectMongoDatabase()

app.listen(port,()=>{
    console.log(`Sever  is running on PORT ${port}`);
    
})