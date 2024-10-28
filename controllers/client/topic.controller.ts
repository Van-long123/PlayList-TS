import Topic from "../../models/topics.model"
import {Request,Response,Router} from 'express';
export const topics=async  (req:Request, res:Response) => {
    const topics =await Topic.find({
        deleted:false
    })
    console.log(topics)
    res.render('client/pages/topics/index',
        {
            title:"Chủ đề bài hát"
        }
    )
}