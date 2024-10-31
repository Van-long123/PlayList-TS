import Topic from "../../models/topics.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import FavoriteSong from "../../models/favorite-song.model";
import {Request,Response} from 'express';
import { convertToSlug } from "../../helpers/convertToSlug";

export const result=async  (req:Request, res:Response) => {
    const type= req.params.type;
    const keyword:string=`${req.query.keyword}`
    let newSongs=[];
    if(keyword){
        //trong mongoose db ko thể tìm chữ cat mà ra cắt cả 
        // có cách như sau ta tìm kiếm theo slug 
        // nếu người ta tìm cat doi thì trong slug có dấu - cat-doi 
        // thì trước khi ta truy vấn db ta đổi chuỗi có dấu - vào 
        // thì ta cài thư viện unidecode thì nó sẽ loại bỏ các chữ tiếng việt 
        // cí dụ gõ chữ cắt nó ra cat npm install unidecode
        // cat doi ---> cat-doi 
        //cắt đổi ---> cat-doi
        //Cat đoi --->cat-doi ...
        const keywordRegex=new RegExp(keyword,'i')

        //tạo ra slug ko dấu có dấu -
        // cắt đôi ---> cat doi ---> cat-doi
        const stringSlug=convertToSlug(keyword)
        const SlugRegex=new RegExp(stringSlug,'i')

        const songs=await Song.find({
            $or:[
                {title:keywordRegex},
                {slug:SlugRegex}
            ],
            deleted:false
            
        })
        for (const song of songs) {
            const infoSinger=await Singer.findOne({
                _id: song.singerId,
                status:'active',
                deleted:false
            })
        // song['infoSinger']=infoSinger //gán như này thì api nó ko có infoUser
        // phải viết rõ như này mới đc chớ việc như trên và newSongs=songs thì trả về api ko nhận
            newSongs.push({
                id:song.id,
                title:song.title,
                avatar:song.avatar,
                like:song.like,
                slug:song.slug,
                infoSinger:{
                    fullName:infoSinger.fullName
                }
            })
    }
    }
    
    // newSongs=songs
    switch (type) {
        case 'result':
            res.render('client/pages/search/result',{
                title:`Kết quả ${keyword}`,
                keyword:keyword,
                songs:newSongs
            })
            break;
        case 'suggest':
            res.json({
                code:200,
                message:"Thành công",
                songs:newSongs
            })
            break;
        
        default:
            break;
    }
    
}
