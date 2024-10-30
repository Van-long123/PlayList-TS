import {Request,Response} from 'express';
import FavoriteSong from "../../models/favorite-song.model";
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
export const index=async  (req:Request, res:Response) => {
    const favoriteSongs=await FavoriteSong.find({
        // userId:"", 
        deleted:false
    })
    for (const song of favoriteSongs) {
        const infoSong=await Song.findOne({
            _id:song.songId,
            deleted:false
        })
        const infoSinger=await Singer.findOne({
            _id: infoSong.singerId,
        })
        song['infoSong']=infoSong
        song['infoSinger']=infoSinger
    }
    res.render('client/pages/favorite-songs/index',{
        title:'Bài hát yêu thích',
        favoriteSongs:favoriteSongs
    })
}