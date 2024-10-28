import express, {Request,Response,Router} from 'express';
import * as controller from '../../controllers/client/song.controller'
// const router=express.Router(); //c1
const router:Router=Router(); //c2 
router.get('/:slugTopic',controller.list)


export const songRoutes:Router = router