import {Request,Response} from 'express';
import Topic from '../../models/topics.model';

export const index=async  (req:Request, res:Response) => {
    const topics=await Topic.find({
        deleted:false 
    })
    res.render('admin/pages/topics/index',{
        title:"Quản lý chủ đề",
        topics:topics
    })
}