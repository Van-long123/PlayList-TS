import {Router} from 'express';
import * as controller from '../../controllers/admin/song.controller'
const router:Router=Router(); //c2 
router.get('/',controller.index)

export const songRoutes:Router = router