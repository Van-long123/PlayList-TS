import Topic from "../../models/topics.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import {Request,Response,Router} from 'express';
export const list=async  (req:Request, res:Response) => {
    try {
        const topic=await Topic.findOne({
            slug:req.params.slugTopic,
            status:'active',
            deleted:false,
        })
        // console.log(topic.title) ko có trả về null mà .title sẽ lỗi nên lọt vào catch
        
        const songs=await Song.find({
            topicId:topic.id,
            status:'active',
            deleted:false,
        }).select('avatar title slug singerId like')
        for (const song of songs) {
            const infoSinger=await Singer.findOne({
                _id: song.singerId,
                status:'active',
                deleted:false
            })
            song['infoSinger']=infoSinger
        }
        res.render('client/pages/songs/list',
            {
                title:topic.title,
                songs:songs
            }
        )
    } catch (error) {
        //đưa slug linh tinh lọt vào đây
        res.redirect('/topics')//trang 404 càng tốt
    }
}

export const detail=async  (req:Request, res:Response) => {
    const slugSong:string = req.params.slugSong;
    const song =await Song.findOne({
        slug:slugSong,
        deleted:false,
        status:"active"
    })
    const singer=await Singer.findOne({
        _id: song.singerId,
        status:'active',
        deleted:false
    }).select('fullName')

    const topic=await Topic.findOne({
        _id: song.topicId,
        status:'active',
        deleted:false
    }).select('title')

    res.render('client/pages/songs/detail',
        {
            title:slugSong,
            song:song,
            singer:singer,
            topic:topic
        }
    )
}

// sau phải user vào và like:[userid] để biết đc user đó thích bài nào để hiển thị nút thích ntn 
export const like=async  (req:Request, res:Response) => {
    try {
        const idSong:string =req.params.idSong;
        const typeLike:string =req.params.typeLike;
        const song =await Song.findOne({
            _id:idSong,
            deleted:false,
            status:"active"
        })
        // sau lưu là lưu id của những người đã like nữa 
        //like:[user_id1,user_id2,user_id3 ...] sau .length là bt có bao thằng like
        const newLike=typeLike=="like" ? song.like+1 :song.like-1;
        await Song.updateOne({
            _id:idSong,
            deleted:false,
            status:"active"
        },{
            like:newLike
        })
        res.json({
            code:200,
            message:'Thành công',
            like:newLike
        })
    } catch (error) {
        
    }
}