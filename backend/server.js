import app from './app.js'
import  dotenv from 'dotenv'
import { connectMongoDatabase } from './config/db.js'
dotenv.config({path:'backend/config/config.env'})
const port = process.env.PORT || 3000

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
        console.log(`Server is shutting  down ,due to uncaught Exception error`);
        process.exit(1)
    
})




connectMongoDatabase()

const server = app.listen(port,()=>{
    console.log(`Sever  is running on PORT ${port}`);
    
})


process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting  down ,due to unhandled promise rejection`);
    
    server.close(()=>{
        process.exit(1)
    })
})
