import express, {Request,Response,Router} from 'express';
import * as controller from '../../controllers/client/topic.controller'
// const router=express.Router(); //c1
const router:Router=Router(); //c2 
router.get('/',controller.topics)


export const topicRoutes:Router = router