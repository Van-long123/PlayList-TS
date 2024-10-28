import Topic from "../../models/topics.model"
import {Request,Response,Router} from 'express';
export const topics=async  (req:Request, res:Response) => {
    const topics =await Topic.find({
        deleted:false
    })
    res.render('client/pages/topics/index',
        {
            title:"Chủ đề bài hát",
            topics:topics
        }
    )
}