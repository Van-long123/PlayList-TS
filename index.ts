import express, {Express,Request,Response} from "express"
import * as databse from './config/database'

import dotenv from 'dotenv'
dotenv.config()
databse.connect() 
const app:Express= express()
const port:string|number= process.env.PORT || 3000
app.set('view engine','pug')
app.set('views',`${__dirname}/views`)
app.get('/topics',(req:Request,res:Response)=>{
    res.render('client/pages/topics/index')
})
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})