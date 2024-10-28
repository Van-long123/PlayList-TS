import express, {Express,Request,Response} from "express"
import * as databse from './config/database'
import clientRoutes from './routes/client/index.route'
import dotenv from 'dotenv'
import { dirname } from "path"

dotenv.config()
databse.connect() 
const app:Express= express()
const port:string|number= process.env.PORT || 3000
app.use(express.static(`${__dirname}/public`));// có thằng này mới dùng đc các file trong public
app.set('view engine','pug')
app.set('views',`${__dirname}/views`)
clientRoutes(app)
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})