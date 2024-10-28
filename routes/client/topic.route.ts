import express, {Request,Response,Router} from 'express';
import Topic from "../../models/topics.model"
// const router=express.Router(); //c1
const router:Router=Router(); //c2 
router.get('/',async  (req:Request, res:Response) => {
    const topics =await Topic.find({
        deleted:false
    })
    console.log(topics)
    res.render('client/pages/topics/index')
})


export const topicRoutes:Router = router