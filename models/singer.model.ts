import mongoose from 'mongoose';
import slug from "mongoose-slug-updater"
const singerSchema=new mongoose.Schema({
    fullName:String,
    avatar:String,
    status:String,
    slug:{
        type :String,
        slug:'fullName',
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date,
},
{
   timestamps:true
})
const Singer=mongoose.model('Singer',singerSchema,'singers')
export default Singer   