import {Router} from 'express';
import * as controller from '../../controllers/admin/topic.controller'
const router:Router=Router(); //c2 
router.get('/',controller.index)

export const topicRoutes:Router = router