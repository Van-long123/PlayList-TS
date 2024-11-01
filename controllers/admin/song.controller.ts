import {Request,Response} from 'express';
import Topic from "../../models/topics.model";
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import { systemConfig } from '../../config/config';

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
    res.render('admin/pages/songs/create',{
        title:"Thêm bài hát mới",
        topics:topics,
        singers:singers
    })
}
export const createPost=async  (req:Request, res:Response) => {
    let avatar='';
    let audio='';
    if(req.body.avatar){
        avatar=req.body.avatar[0]
    }
    if(req.body.audio){
        audio=req.body.audio[0]
    }
    // làm như này cho chắc để khỏi f12 lên thêm hoặc sửa các name input
    // ví dụ hén thêm 1 input like nữa thì khi dùng req.body thì sẽ lưu vào db đc 
    const dataSong={
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics:req.body.lyrics,
        // avatar: req.body.avatar
        avatar: avatar,
        audio: audio
    }
    const song=new Song(dataSong)
    await song.save()
    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}
export const edit=async  (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const song=await Song.findOne({
            _id:id,
            deleted:false
        })
        const topics=await Topic.find({
            status:'active',
            deleted:false 
        }).select('title')//còn id mặc định tự trả ra 
        const singers=await Singer.find({
            deleted:false 
        }).select('fullName')
        res.render('admin/pages/songs/edit',{
            title:"Chỉnh sửa hát mới",
            song:song,
            topics:topics,
            singers:singers
        })
    } catch (error) {
        res.redirect('back')
    }
}
export const editPatch=async  (req:Request, res:Response) => {
    const id = req.params.id;
    
    const dataSong={
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics:req.body.lyrics,
    }
    if(req.body.avatar){
        dataSong['avatar']=req.body.avatar[0]
    }
    if(req.body.audio){
        dataSong['audio']=req.body.audio[0]
    }
    await Song.updateOne({
        _id:id,
        deleted: false
    },dataSong)
    res.redirect('back')
}