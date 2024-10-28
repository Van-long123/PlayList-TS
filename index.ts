import express, {Express,Request,Response} from "express"
import * as databse from './config/database'
import clientRoutes from './routes/client/index.route'
import dotenv from 'dotenv'

dotenv.config()
databse.connect() 
const app:Express= express()
const port:string|number= process.env.PORT || 3000
app.set('view engine','pug')
app.set('views',`${__dirname}/views`)
clientRoutes(app)
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})