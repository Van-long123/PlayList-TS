import {Request,Response} from 'express';
import FavoriteSong from "../../models/favorite-song.model";
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index=async  (req:Request, res:Response) => {
    res.render('admin/pages/dashboard/index',{
        title:"Tổng quan"
    })
}