import { Router } from 'express';
import multer from 'multer'
const upload = multer()
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middleware';
import * as controller from '../../controllers/admin/song.controller'
const router: Router = Router(); //c2 
router.get('/', controller.index)
router.get('/create', controller.create)
//upload.single('avatar') đổi lại thành mul vì sau ta upload nhiều trường ngoài avatar ra ta uplaod cả file audio nữa 
router.post('/create',
    // upload.single('avatar'),
    upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    uploadCloud.uploadFields,
    // uploadCloud.uploadSingle,
    controller.createPost
)
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id',
    upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
    uploadCloud.uploadFields,
    controller.editPatch
)
export const songRoutes: Router = router