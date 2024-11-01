import {Request,Response} from 'express';

export const index=async  (req:Request, res:Response) => {
    // console.log(req.body) //có đường link ảnh đc lưu trên cloud rồi h ta phải hiển thị nó trên thẻ img trong  view 
    // thì ta trả về object có key location là đc 
    res.json({
        location:req.body.file
    })
}