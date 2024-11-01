import {Router} from 'express';
import multer from 'multer'
const upload = multer()
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middleware';
import * as controller from '../../controllers/admin/upload.controller'
const router:Router=Router(); //c2 
router.post('/',
    upload.single('file'),
    uploadCloud.uploadSingle,controller.index)

export const uploadRoutes:Router = router