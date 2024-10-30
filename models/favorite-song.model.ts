import mongoose from 'mongoose';
import slug from "mongoose-slug-updater"
const favoriteSongSchema=new mongoose.Schema({
    userId:String,
    songId:String,
    deleted:{
        type:Boolean,
        default:false
    },
},
{
   timestamps:true
})
const FavoriteSong=mongoose.model('FavoriteSong',favoriteSongSchema,'favorite-songs')
export default FavoriteSong   