import {Request,Response} from 'express';
import Song from '../../models/song.model';

export const index=async  (req:Request, res:Response) => {
    const songs=await Song.find({
        deleted:false 
    })
    console.log(songs)
    res.render('admin/pages/songs/index',{
        title:"Quản lý bài hát",
        songs:songs
    })
}