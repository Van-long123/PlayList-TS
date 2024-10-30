import express, {Request,Response,Router} from 'express';
import * as controller from '../../controllers/client/search.controller'
const router:Router=Router(); //c2 
router.get('/result',controller.result)


export const searchRoutes:Router = router