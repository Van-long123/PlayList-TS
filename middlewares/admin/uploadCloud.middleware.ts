
// ta import thằng này qua bên route thì cũng như khai báo ở trên thôi 
// import vào là cả đoạn code dưới luôn 
import { Request,Response,NextFunction } from 'express';
import { v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from 'dotenv'
dotenv.config();

// cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});
// cloudinary
//này là middleware xử lý logic để upload lên online

export const upload=(req:Request, res:Response, next:NextFunction) =>{
    if(req['file']){
        let streamUpload = (req:Request) => {
            return new Promise((resolve, reject) => {
                //hàm này là cloudinary tự định nghĩa ra 
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req['file'].buffer).pipe(stream);
            });
        };
    
        async function upload(req:Request) {
            // up load thàng công trả về 1 object
            //hàm để upload lên cloud
            let result = await streamUpload(req);
            // để thumbnail thì ko tổng quát lỡ bên view name input là image ko lẽ sửa lại hết
            req.body[req['file'].fieldname]=result['secure_url'];
            // console.log(req.body[req.file.fieldname])
            // console.log(req.file.fieldname)
            // console.log(result);
            next();//ko có next là nó sẽ ko xuống mấy thằng dưới
        }
    
        upload(req);
        //bỏ next dưới này là nó chạy upload và chạy luôn next luôn
    }
    else{
        next();//ko có next là nó sẽ ko xuống mấy thằng dưới
    }
}


const streamUpload=(buffer:any)=>{
  return new Promise((resolve, reject) => {
    //hàm này là cloudinary tự định nghĩa ra 
    let stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

  streamifier.createReadStream(buffer).pipe(stream);
});
}

const uploadToCloudinary=async (buffer:any)=>{
  let result =await streamUpload(buffer);
  return result["url"];
}
export const uploadSingle =async (req:Request, res:Response, next:NextFunction) =>{
  try {
    const result =await uploadToCloudinary(req["file"].buffer)
    req.body[req["file"].fieldname]=result
  } catch (error) {
    console.log(error)
  }
  next()
}

export const uploadFields =async (req:Request, res:Response, next:NextFunction) =>{
  // upload nhiều file thì trả ta 1 mảng chứa các file
  for (const key in req["files"]) {
    req.body[key]=[]
    const array=req["files"][key]//lưu dưới 1 mảng vì avart hoặc audio có thể có nhiều ảnh 
    console.log(array)
    console.log(key)
    for (const item of array) {
      try {
        const result =await uploadToCloudinary(item.buffer)
        req.body[key].push(result)
        // req.body[key]=result // lưu này cũng đúng tuy nhiên nếu upload nhiều image thì dùng thằng trên để lưu vào 1 mảng
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  
  next()
}