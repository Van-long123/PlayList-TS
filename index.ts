import express, {Express,Request,Response} from "express"
import * as databse from './config/database'
import clientRoutes from './routes/client/index.route'
import methodOverride from 'method-override'
import adminRoutes from './routes/admin/index.route'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import { systemConfig } from "./config/config"

dotenv.config()
databse.connect() 
const app:Express= express()
const port:string|number= process.env.PORT || 3000
app.use(express.static(`${__dirname}/public`));// có thằng này mới dùng đc các file trong public
app.set('view engine','pug')
app.use(methodOverride('_method'))
app.set('views',`${__dirname}/views`)
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(bodyParser.urlencoded({ extended: false }))
app.locals.prefixAdmin=systemConfig.prefixAdmin
clientRoutes(app)
adminRoutes(app)
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})