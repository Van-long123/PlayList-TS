import {Request,Response} from 'express';
import Topic from "../../models/topics.model";
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
export const index=async  (req:Request, res:Response) => {
    const songs=await Song.find({
        deleted:false 
    })

    res.render('admin/pages/songs/index',{
        title:"Quản lý bài hát",
        songs:songs
    })
}
export const create=async  (req:Request, res:Response) => {
    const topics=await Topic.find({
        status:'active',
        deleted:false 
    }).select('title')//còn id mặc định tự trả ra 
    const singers=await Singer.find({
        deleted:false 
    }).select('fullName')
    console.log(singers)
    res.render('admin/pages/songs/create',{
        title:"Thêm bài hát mới",
        topics:topics,
        singers:singers
    })
}