import express, {Request,Response,Router} from 'express';
import * as controller from '../../controllers/client/song.controller'
// const router=express.Router(); //c1
const router:Router=Router(); //c2 
router.get('/:slugTopic',controller.list)
router.get('/detail/:slugSong',controller.detail)

router.patch('/like/:typeLike/:idSong',controller.like)
router.patch('/fovarite/:typeFavorite/:idSong',controller.favorite)
router.patch('/listen/:idSong',controller.listen)

export const songRoutes:Router = router