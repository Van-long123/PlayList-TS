import express, {Express,Request,Response} from "express"
const app:Express= express()
const port:string|number= 3000
app.set('view engine','pug')
app.set('views',`${__dirname}/views`)
app.get('/topics',(req:Request,res:Response)=>{
    res.render('client/pages/topics/index')
})
app.listen(port,()=>{
    console.log("http://localhost:3000/ "+port)
})